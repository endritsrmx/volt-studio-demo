"use client";

import ShaderCanvas from "./ShaderCanvas";
import site from "@/config/site";
import { hexToRgb01 } from "@/lib/utils";

/**
 * Animated grain gradient ("grainient").
 * Two colors blended along a domain-warped vertical axis, plus animated film grain.
 * Original shader written for this project.
 */
const FRAG = `
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uWarpFreq;
uniform float uWarpAmp;
uniform float uAngle;
uniform float uLow;
uniform float uHigh;
uniform float uGrain;
uniform float uFlip;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){ float v = 0.0; float a = 0.5; for(int i=0;i<3;i++){ v += a * noise(p); p *= 2.02; a *= 0.5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  if (uFlip > 0.5) uv.y = 1.0 - uv.y;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime * 0.27;

  // domain warp
  vec2 q = vec2(fbm(p * uWarpFreq + vec2(0.0, t)), fbm(p * uWarpFreq + vec2(5.2, -t * 0.8)));
  vec2 r = p + (q - 0.5) * uWarpAmp;
  r.y += sin(r.x * uWarpFreq * 1.7 + t * 2.0) * 0.035 * uWarpAmp;

  // rotate the blend axis
  float s = sin(uAngle), c = cos(uAngle);
  vec2 rr = mat2(c, -s, s, c) * (r - vec2(aspect * 0.5, 0.5)) + vec2(aspect * 0.5, 0.5);

  float g = smoothstep(uLow, uHigh, 1.0 - rr.y);
  g = g * g * (3.0 - 2.0 * g);
  vec3 col = mix(uC1, uC2, g);

  // animated film grain
  float n = hash(gl_FragCoord.xy + fract(uTime * 7.0) * 311.0) - 0.5;
  col += n * uGrain;
  fragColor = vec4(col, 1.0);
}
`;

type Props = {
  className?: string;
  from?: string;
  to?: string;
  /** where the second color starts / reaches full strength (0 = top, 1 = bottom) */
  low?: number;
  high?: number;
  warpFrequency?: number;
  warpAmplitude?: number;
  angle?: number; // radians
  grain?: number;
  flip?: boolean;
  speed?: number;
};

export default function GrainGradient({
  className,
  from = site.theme.gradientFrom,
  to = site.theme.gradientTo,
  low = 0.35,
  high = 1.05,
  warpFrequency = 1.6,
  warpAmplitude = 0.55,
  angle = 0,
  grain = 0.09,
  flip = false,
  speed = 1,
}: Props) {
  const c1 = hexToRgb01(from);
  const c2 = hexToRgb01(to);
  return (
    <ShaderCanvas
      className={className}
      fragment={FRAG}
      speed={speed}
      fallback={`linear-gradient(${flip ? "180deg" : "0deg"}, ${to} 0%, ${from} 70%)`}
      uniforms={() => ({
        uC1: c1,
        uC2: c2,
        uWarpFreq: warpFrequency,
        uWarpAmp: warpAmplitude,
        uAngle: angle,
        uLow: low,
        uHigh: high,
        uGrain: grain,
        uFlip: flip ? 1 : 0,
      })}
    />
  );
}
