import Hero from "@/components/home/Hero";
import Approach from "@/components/home/Approach";
import Stats from "@/components/home/Stats";
import Work from "@/components/home/Work";
import Services from "@/components/home/Services";
import LabTeaser from "@/components/home/LabTeaser";
import BlogPreview from "@/components/home/BlogPreview";
import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Approach />
      <Stats />
      <Work />
      <Services />
      <LabTeaser />
      <BlogPreview />
      <CtaSection />
      <FaqSection />
    </>
  );
}
