"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type UniformValue = number | [number, number] | [number, number, number];
export type FrameState = { time: number; width: number; height: number; mouse: [number, number] };

type Props = {
  /** GLSL ES 3.00 fragment shader body. Receives uRes, uTime, uMouse automatically. */
  fragment: string;
  /** Static or per-frame uniforms */
  uniforms?: (s: FrameState) => Record<string, UniformValue>;
  className?: string;
  /** Max device pixel ratio – soft gradients don't need retina. */
  dpr?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Track mouse relative to the canvas (0..1). */
  trackMouse?: boolean;
  /** Static fallback background (shown before WebGL boots / if unsupported) */
  fallback?: string;
  ariaHidden?: boolean;
};

const VERT = `#version 300 es
in vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

/**
 * Lightweight full-screen shader canvas.
 * - one triangle, no dependencies
 * - pauses when off-screen (IntersectionObserver) or when the tab is hidden
 * - renders a single still frame for prefers-reduced-motion
 * - releases the GL context on unmount
 */
export default function ShaderCanvas({
  fragment,
  uniforms,
  className,
  dpr = 1.5,
  speed = 1,
  trackMouse = false,
  fallback,
  ariaHidden = true,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const uniformsRef = useRef(uniforms);
  uniformsRef.current = uniforms;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl) {
      canvas.style.opacity = "1"; // show the CSS fallback background
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
      }
      return s;
    };
    const prog = gl.createProgram()!;
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(
      gl.FRAGMENT_SHADER,
      `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
out vec4 fragColor;
${fragment}`,
    );
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const locs = new Map<string, WebGLUniformLocation | null>();
    const u = (name: string) => {
      if (!locs.has(name)) locs.set(name, gl.getUniformLocation(prog, name));
      return locs.get(name)!;
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 1;
    let height = 1;
    const mouse: [number, number] = [0.5, 0.5];
    const mouseTarget: [number, number] = [0.5, 0.5];

    const resize = () => {
      const r = Math.min(window.devicePixelRatio || 1, dpr);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width * r));
      height = Math.max(1, Math.round(rect.height * r));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(lastT);
    });
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseTarget[0] = (e.clientX - rect.left) / rect.width;
      mouseTarget[1] = 1 - (e.clientY - rect.top) / rect.height;
    };
    if (trackMouse) window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = false;
    let visible = false;
    let lastT = 0;
    let acc = 0;
    let prev = performance.now();

    const draw = (t: number) => {
      mouse[0] += (mouseTarget[0] - mouse[0]) * 0.06;
      mouse[1] += (mouseTarget[1] - mouse[1]) * 0.06;
      gl.uniform2f(u("uRes"), width, height);
      gl.uniform1f(u("uTime"), t);
      gl.uniform2f(u("uMouse"), mouse[0], mouse[1]);
      const extra = uniformsRef.current?.({ time: t, width, height, mouse });
      if (extra) {
        for (const [k, v] of Object.entries(extra)) {
          if (typeof v === "number") gl.uniform1f(u(k), v);
          else if (v.length === 2) gl.uniform2f(u(k), v[0], v[1]);
          else gl.uniform3f(u(k), v[0], v[1], v[2]);
        }
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      const now = performance.now();
      acc += Math.min(0.05, (now - prev) / 1000) * speed;
      prev = now;
      lastT = acc;
      draw(acc);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    draw(reduced ? 4.0 : 0);
    canvas.style.opacity = "1";

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : visible && start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (trackMouse) window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [fragment, dpr, speed, trackMouse]);

  return (
    <canvas
      ref={ref}
      aria-hidden={ariaHidden}
      className={cn("block h-full w-full opacity-0 transition-opacity duration-700", className)}
      style={fallback ? { background: fallback } : undefined}
    />
  );
}
