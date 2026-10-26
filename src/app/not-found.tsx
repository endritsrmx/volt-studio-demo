import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center justify-center pt-[var(--nav-h)]">
      <div className="container-narrow flex flex-col items-center gap-6 text-center">
        <span className="tag">Error 404</span>
        <h1 className="title-xl" style={{ fontSize: "clamp(80px, 16vw, 220px)", lineHeight: 0.9 }}>
          4<span className="text-accent">0</span>4
        </h1>
        <p className="p-hero max-w-[460px]">This page switched itself off. Let&apos;s get you back somewhere bright.</p>
        <div className="flex gap-4">
          <Button href="/">Back home</Button>
          <Button href="/works" variant="secondary">See our works</Button>
        </div>
      </div>
    </section>
  );
}
