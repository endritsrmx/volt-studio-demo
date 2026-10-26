"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BP, INTRO_VARIANT } from "@/config/site";
import { useLang } from "@/i18n/LangProvider";
import { useLenis } from "@/components/providers/SmoothScroll";

const SRC = `${BP}/intro/intro-${INTRO_VARIANT}`;
const PLAY_WAIT = 1500; // ms until we give up on the video
const HARD_TIMEOUT = 8000; // absolute max time behind the overlay
const FADE = 700;

type W = Window & { __introDone?: boolean };

/** Full-screen logo intro, shown on every page open, then crossfades into the site. */
export default function IntroOverlay() {
  const { lang } = useLang();
  const lenis = useLenis();
  const video = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"play" | "still" | "out" | "gone">("play");
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setPhase("out");
    const w = window as W;
    // start the hero reveal while the overlay crossfades
    window.setTimeout(() => {
      document.documentElement.classList.remove("intro");
      if (!w.__introDone) {
        w.__introDone = true;
        window.dispatchEvent(new Event("intro:done"));
      }
    }, 150);
    window.setTimeout(() => setPhase("gone"), FADE + 50);
  }, []);

  const still = useCallback((ms: number) => {
    if (done.current) return;
    setPhase("still");
    window.setTimeout(finish, ms);
  }, [finish]);

  useEffect(() => {
    if ((window as W).__introDone) { setPhase("gone"); return; }
    const hard = window.setTimeout(finish, HARD_TIMEOUT);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      still(900);
      return () => window.clearTimeout(hard);
    }
    const v = video.current;
    let started = false;
    const onPlaying = () => { started = true; };
    v?.addEventListener("playing", onPlaying);
    v?.play()?.catch(() => still(1000));
    const wait = window.setTimeout(() => {
      if (!started && (!v || v.currentTime === 0)) still(1000);
    }, PLAY_WAIT);
    return () => {
      window.clearTimeout(hard);
      window.clearTimeout(wait);
      v?.removeEventListener("playing", onPlaying);
    };
  }, [finish, still]);

  // stop smooth scrolling while the intro is visible
  useEffect(() => {
    if (!lenis) return;
    if (phase === "play" || phase === "still") lenis.stop();
    else lenis.start();
  }, [lenis, phase]);

  if (phase === "gone") return null;

  return (
    <div className={`intro-overlay${phase === "out" ? " is-out" : ""}`} role="presentation">
      <div className="intro-stage" aria-hidden="true">
        {phase !== "still" && (
          <video
            ref={video}
            className="intro-media"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={finish}
            onError={() => still(1000)}
            disablePictureInPicture
          >
            <source src={`${SRC}.mp4`} type="video/mp4" />
            <source src={`${SRC}.webm`} type="video/webm" />
          </video>
        )}
        {phase === "still" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="intro-media intro-still" src={`${SRC}-final.png`} alt="" />
        )}
      </div>
      <button type="button" className="intro-skip" onClick={finish}>
        {lang === "en" ? "Skip" : "Überspringen"}
      </button>
    </div>
  );
}
