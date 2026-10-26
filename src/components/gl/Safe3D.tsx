"use client";

import { Component, type ReactNode } from "react";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static CSS version of the 3D switch – used when WebGL is unavailable. */
export function SwitchFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden>
      <div className="relative h-[150px] w-[340px] -rotate-6 rounded-pill bg-gradient-to-b from-[#1b1b1b] to-black shadow-[inset_0_2px_6px_rgba(255,255,255,0.15),0_40px_80px_rgba(0,0,0,0.6)]">
        <div className="absolute left-[18px] top-1/2 h-[94px] w-[94px] -translate-y-1/2 rounded-full bg-accent shadow-[0_0_60px_rgb(var(--c-accent)/0.6)]" />
      </div>
    </div>
  );
}

/** Error boundary + capability check around WebGL scenes. */
export default class Safe3D extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidMount() {
    if (!hasWebGL()) this.setState({ failed: true });
  }
  render() {
    if (this.state.failed) return this.props.fallback ?? <SwitchFallback />;
    return this.props.children;
  }
}
