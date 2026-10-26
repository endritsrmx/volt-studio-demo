import site from "@/config/site";
import SectionHead from "@/components/ui/SectionHead";
import TitleText, { Lines } from "@/components/ui/Title";
import NumberTicker from "@/components/ui/NumberTicker";
import CountUp from "@/components/ui/CountUp";
import GrowthChart from "@/components/ui/GrowthChart";
import Marquee from "@/components/ui/Marquee";
import { ToolIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

function Stat({ value, suffix, decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  return (
    <div className="text-[64px] font-light leading-none text-accent max-sm:text-[52px]">
      <NumberTicker value={value} decimals={decimals} suffix={suffix} suffixClassName="ml-1 text-[32px] text-fg" />
    </div>
  );
}

function Card({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div
      data-reveal
      data-delay={String(delay)}
      className={cn("card-line grid-paper relative flex flex-col gap-6 overflow-hidden bg-black p-10 max-sm:p-6", className)}
    >
      {children}
    </div>
  );
}

export default function Stats() {
  const s = site.stats;
  return (
    <section className="section">
      <div className="container-narrow">
        <SectionHead tag={s.tag} title={s.title} body={s.body} />
      </div>
      <div className="h-[80px] max-sm:h-10" />
      <div className="container-big">
        <div className="flex flex-col gap-6">
        <div className="grid grid-cols-[1.88fr_1fr] gap-4 max-md:grid-cols-1 max-md:gap-6">
          {/* conversion */}
          <Card className="min-h-[538px] max-md:min-h-0">
            <Stat value={s.conversion.value} suffix={s.conversion.suffix} />
            <div className="flex flex-col gap-[14px]">
              <h3 className="title-m">
                <TitleText title={s.conversion.title} />
              </h3>
              <p className="p-body max-w-[600px]">{s.conversion.body}</p>
            </div>
            <GrowthChart points={s.conversion.chart} className="mt-auto pt-8" />
          </Card>

          {/* sessions */}
          <Card delay={0.15} className="min-h-[538px] max-md:min-h-0">
            <Stat value={s.session.value} suffix={s.session.suffix} />
            <div className="flex flex-col gap-[14px]">
              <h3 className="title-m">
                <TitleText title={s.session.title} />
              </h3>
              <p className="p-body">
                <Lines text={s.session.body} />
              </p>
            </div>
            <div className="mt-auto flex flex-col items-center justify-center gap-1 rounded-[18px] bg-white/10 px-6 py-6 transition-transform duration-300 hover:-translate-y-1">
              <div className="text-[56px] font-light leading-none text-accent">
                <CountUp from={s.session.counter.from} to={s.session.counter.to} decimals={s.session.counter.decimals} />
              </div>
              <div className="font-mono text-[11px] uppercase text-fg/70">{s.session.counter.suffix} avg. session</div>
            </div>
          </Card>

        </div>
        <div className="grid grid-cols-[1fr_1.88fr] gap-4 max-md:grid-cols-1 max-md:gap-6">
          {/* disciplines */}
          <Card className="max-md:min-h-0 md:min-h-[495px]">
            <Stat value={s.disciplines.value} />
            <div className="flex flex-col gap-[14px]">
              <h3 className="title-m">
                <TitleText title={s.disciplines.title} />
              </h3>
              <p className="p-body">{s.disciplines.body}</p>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-3">
              {s.disciplines.tools.map((t) => (
                <div
                  key={t}
                  className="group flex h-[51px] items-center justify-center gap-2 rounded-[18px] bg-white/10 text-fg transition-[background-color,transform,color] duration-300 ease-out hover:-translate-y-1 hover:bg-accent hover:text-accent-ink"
                  title={t}
                >
                  <ToolIcon name={t} size={20} />
                  <span className="text-[12px]">{t}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* in-house + marquee */}
          <Card delay={0.15} className="!px-0 max-md:min-h-0 md:min-h-[495px]">
            <div className="flex flex-col gap-6 px-10 max-sm:px-6">
              <Stat value={s.inhouse.value} suffix={s.inhouse.suffix} />
              <div className="flex flex-col gap-[14px]">
                <h3 className="title-m">
                  <TitleText title={s.inhouse.title} />
                </h3>
                <p className="p-body max-w-[640px]">{s.inhouse.body}</p>
              </div>
            </div>
            <Marquee
              className="mt-auto py-6"
              speed={26}
              items={site.clients.map((c) => (
                <span key={c} className="whitespace-nowrap text-[28px] font-medium tracking-tight text-white/60 transition-colors hover:text-fg">
                  {c}
                </span>
              ))}
            />
          </Card>
        </div>
        </div>
      </div>
    </section>
  );
}
