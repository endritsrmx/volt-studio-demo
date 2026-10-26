import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center pt-[var(--nav-h)]">
      <div className="container-narrow flex flex-col items-center gap-6 text-center">
        <h1 className="title-xl" style={{ fontSize: "clamp(80px, 16vw, 200px)", lineHeight: 0.9 }}>
          4<span className="text-accent">0</span>4
        </h1>
        <p className="p-hero">Seite nicht gefunden · Page not found</p>
        <Button href="/">Zur Startseite</Button>
      </div>
    </section>
  );
}
