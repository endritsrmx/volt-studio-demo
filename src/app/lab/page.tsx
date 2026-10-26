import type { Metadata } from "next";
import Desktop from "@/components/lab/Desktop";
import LabSlider from "@/components/pages/LabSlider";

export const metadata: Metadata = {
  title: "Lab",
  description: "Self-initiated experiments in WebGL, 3D, interfaces and AI.",
};

export default function LabPage() {
  return (
    <>
      <h1 className="sr-only">Lab</h1>
      <Desktop />
      <LabSlider tag="Index" title="Every experiment, in one place" />
    </>
  );
}
