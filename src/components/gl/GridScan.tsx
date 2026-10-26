"use client";

import ShaderCanvas from "./ShaderCanvas";
import site from "@/config/site";

/**
 * Perspective grid tunnel with a travelling scan light.
 * Ray-casts into an axis-aligned square tunnel and draws anti-aliased grid
 * lines on its four walls. Original shader written for this project.
 */
const FRAG = `
uniform vec3 uLine;
uniform vec3 uScan;
uniform float uScale;

float gridLine(vec2 c){
  vec2 g = abs(fract(c - 0.5) - 0.5) / fwidth(c);
  return 1.0 - min(min(g.x, g.y), 1.0);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  // subtle parallax from the cursor
  vec2 m = (uMouse - 0.5) * 0.18;
  vec3 ro = vec3(m.x, m.y, 0.0);
  vec3 rd = normalize(vec3(uv, 1.25));

  // walls at |x| = W, |y| = 1
  float W = max(1.0, uRes.x / uRes.y * 0.9);
  float tx = (sign(rd.x) * W - ro.x) / rd.x;
  float ty = (sign(rd.y) * 1.0 - ro.y) / rd.y;
  float t = min(tx, ty);
  vec3 p = ro + rd * t;

  vec2 wall = (tx < ty) ? vec2(p.z, p.y) : vec2(p.x, p.z);
  float line = gridLine(wall / uScale);

  float depth = p.z;
  float fade = exp(-depth * 0.16);

  // travelling scan band (moves away from the viewer and loops)
  float scanZ = mod(uTime * 2.2, 14.0);
  float band = exp(-pow((depth - scanZ) * 1.4, 2.0));

  vec3 col = uLine * line * 0.28 * fade;
  col += uScan * band * (0.35 + line * 1.6) * fade * 1.2;
  // far glow
  col += uScan * 0.06 * smoothstep(0.0, 0.25, 0.12 - length(uv)) ;
  fragColor = vec4(col, 1.0);
}
`;

function rgb(triplet: string): [number, number, number] {
  const [r, g, b] = triplet.split(" ").map(Number);
  return [r / 255, g / 255, b / 255];
}

export default function GridScan({ className }: { className?: string }) {
  const scan = rgb(site.theme.accent);
  return (
    <ShaderCanvas
      className={className}
      fragment={FRAG}
      dpr={1.5}
      trackMouse
      fallback="#000"
      uniforms={() => ({ uLine: [1, 1, 1], uScan: scan, uScale: 0.55 })}
    />
  );
}
