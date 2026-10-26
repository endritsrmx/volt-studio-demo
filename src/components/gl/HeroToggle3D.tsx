"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import site from "@/config/site";
import Safe3D from "./Safe3D";

function accentColor() {
  const [r, g, b] = site.theme.accent.split(" ").map(Number);
  return new THREE.Color(r / 255, g / 255, b / 255);
}

function Switch({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const knob = useRef<THREE.Group>(null);
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);
  const interacted = useRef(false);
  const intro = useRef(0);
  const accent = useMemo(accentColor, []);

  // idle auto-toggle until the visitor clicks it themselves
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!interacted.current) setOn((v) => !v);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hover]);

  useFrame((state, delta) => {
    const g = group.current;
    const k = knob.current;
    if (!g || !k) return;
    // entrance: spin + scale in (outExpo-ish)
    intro.current = Math.min(1, intro.current + delta * (reduced ? 10 : 0.7));
    const e = 1 - Math.pow(1 - intro.current, 4);
    // fit the 3.4 × 1.5 object into the current canvas
    const fit = Math.min(1.15, (state.viewport.width * 0.78) / 3.4, (state.viewport.height * 0.62) / 1.5);
    const s = (0.6 + 0.4 * e) * fit;
    g.scale.setScalar(s);

    // pointer tilt
    const px = state.pointer.x;
    const py = state.pointer.y;
    const baseY = -0.62 + (1 - e) * -2.2;
    const t = state.clock.elapsedTime;
    const float = reduced ? 0 : Math.sin(t * 0.9) * 0.06;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, baseY + px * 0.35, 4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.12 - py * 0.25, 4, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -0.04 + px * 0.05, 4, delta);
    g.position.y = float;

    // knob slide with a little overshoot (spring)
    const target = on ? 0.86 : -0.86;
    k.position.x = THREE.MathUtils.damp(k.position.x, target, 9, delta);
    const sc = hover ? 1.06 : 1;
    k.scale.setScalar(THREE.MathUtils.damp(k.scale.x, sc, 8, delta));
  });

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation();
        interacted.current = true;
        setOn((v) => !v);
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* body */}
      <RoundedBox args={[3.4, 1.5, 1.25]} radius={0.62} smoothness={10} bevelSegments={6}>
        <meshPhysicalMaterial color="#060606" roughness={0.28} metalness={0.4} clearcoat={1} clearcoatRoughness={0.18} />
      </RoundedBox>
      {/* recessed face */}
      <RoundedBox args={[3.05, 1.18, 0.2]} radius={0.09} smoothness={6} position={[0, 0, 0.56]}>
        <meshPhysicalMaterial color="#0d0d0d" roughness={0.55} metalness={0.2} clearcoat={0.4} />
      </RoundedBox>
      {/* knob */}
      <group ref={knob} position={[-0.86, 0, 0.66]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.47, 0.47, 0.16, 64]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.18} roughness={0.3} metalness={0.05} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <torusGeometry args={[0.5, 0.035, 16, 80]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
        </mesh>
        <pointLight color={accent} intensity={on ? 1.2 : 0.7} distance={3} position={[0, 0, 0.6]} />
      </group>
    </group>
  );
}

export default function HeroToggle3D({ reduced = false }: { reduced?: boolean }) {
  return (
    <Safe3D>
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      aria-label="Interactive 3D toggle switch"
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#ccff00" />
      <Switch reduced={reduced} />
      {/* local lightformer environment – no network HDR required */}
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[8, 1.4, 1]} />
        <Lightformer intensity={1.2} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer intensity={0.6} color="#ccff00" position={[4, -2, 2]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
      </Environment>
    </Canvas>
    </Safe3D>
  );
}
