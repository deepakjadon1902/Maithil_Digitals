import { BarChart3, Megaphone, Play } from "lucide-react";
import { lazy, Suspense } from "react";
import { Button } from "./Button";

const BrandOrbit = lazy(() => import("./BrandOrbit").then((module) => ({ default: module.BrandOrbit })));

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(240,106,0,0.16),transparent_26%),linear-gradient(135deg,#1F2040_0%,#111226_42%,#0B0C18_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto grid min-h-[780px] max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.04fr_.96fr] lg:px-8">
        <div>
          <p className="md-orbit-drift text-xs font-black uppercase tracking-[0.28em] text-orange">Digital Marketing / Creative / Growth</p>
          <h1 className="md-orbit-drift-reverse mt-6 max-w-5xl font-display text-5xl font-black leading-[0.92] md:text-7xl xl:text-[104px]">
            We turn ideas into digital growth.
          </h1>
          <p className="md-float-soft mt-7 max-w-2xl text-lg leading-8 text-muted">
            Maithil Digitals helps businesses build stronger brands, reach the right audience and create meaningful digital experiences through strategy, creativity and technology.
          </p>
          <div className="md-float-soft-alt mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Start a Conversation</Button>
            <Button href="/work" variant="ghost">Explore Our Work</Button>
          </div>
        </div>
        <div className="relative min-h-[540px]">
          <div className="md-breathe absolute inset-x-4 top-0 h-72 overflow-hidden rounded-premium border border-white/10 bg-white/[0.03]">
            <Suspense fallback={<div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(240,106,0,0.18),transparent_55%)]" />}>
              <BrandOrbit />
            </Suspense>
          </div>
          <div className="md-float-soft-slow absolute right-0 top-24 w-[78%] overflow-hidden rounded-premium border border-white/10 bg-white/7 shadow-glow">
            <div className="aspect-[4/5] bg-[linear-gradient(145deg,rgba(240,106,0,.25),rgba(255,255,255,.04)),url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
          </div>
          <div className="md-float-soft absolute bottom-8 left-0 w-[72%] rounded-premium border border-white/10 bg-deep/92 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange">01 / Digital Strategy</p>
                <h2 className="mt-3 text-2xl font-black">Campaign system preview</h2>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-orange text-white"><Play size={19} fill="currentColor" /></span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted">
              <span className="rounded-premium border border-white/10 p-3"><Megaphone className="mb-3 text-orange" size={18} />Creative launches</span>
              <span className="rounded-premium border border-white/10 p-3"><BarChart3 className="mb-3 text-orange" size={18} />Measured growth</span>
            </div>
          </div>
          <div className="md-float-soft-alt absolute left-8 top-12 rounded-premium border border-white/10 bg-white px-4 py-3 text-sm font-black text-ink">02 / Creative</div>
          <div className="md-float-soft-slow absolute bottom-0 right-10 rounded-premium border border-white/10 bg-orange px-4 py-3 text-sm font-black text-white">03 / Performance</div>
        </div>
      </div>
    </section>
  );
}
