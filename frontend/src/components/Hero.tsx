import { Camera, Megaphone, Palette, Play, Video } from "lucide-react";
import { lazy, Suspense } from "react";
import { Button } from "./Button";

const BrandOrbit = lazy(() => import("./BrandOrbit").then((module) => ({ default: module.BrandOrbit })));

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(240,106,0,0.16),transparent_26%),linear-gradient(135deg,#1F2040_0%,#111226_42%,#0B0C18_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
        <div>
          <p className="md-orbit-drift text-xs font-black uppercase tracking-[0.28em] text-orange">Digital Marketing / Creative / Growth</p>
          <h1 className="md-orbit-drift-reverse mt-6 max-w-5xl font-display text-5xl font-black leading-[0.94] md:text-7xl xl:text-[88px]">
            Your brand. Your story. Your digital identity.
          </h1>
          <p className="md-float-soft mt-7 max-w-2xl text-lg leading-8 text-muted">
            We help businesses build a stronger digital presence through strategic social media, creative content, professional photography, reels, branding and digital marketing.
          </p>
          <div className="md-float-soft-alt mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Get Started</Button>
            <Button href="/work" variant="ghost">View Our Work</Button>
          </div>
        </div>
        <div className="relative min-h-[500px] overflow-hidden rounded-premium lg:overflow-visible">
          <div className="md-breathe absolute inset-x-4 top-0 h-56 overflow-hidden rounded-premium border border-white/10 bg-white/[0.03]">
            <Suspense fallback={<div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(240,106,0,0.18),transparent_55%)]" />}>
              <BrandOrbit />
            </Suspense>
          </div>
          <div className="md-float-soft-slow absolute right-4 top-24 w-[68%] overflow-hidden rounded-premium border border-white/10 bg-white/7 shadow-glow">
            <div className="grid aspect-[4/5] place-items-center bg-[radial-gradient(circle_at_35%_25%,rgba(240,106,0,.32),transparent_32%),linear-gradient(145deg,rgba(31,32,64,.98),rgba(11,12,24,.98))] p-5">
              <div className="grid w-full gap-3">
                <div className="ml-auto w-[82%] rounded-premium border border-white/10 bg-white p-3 text-ink shadow-glow">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange">Instagram Content</p>
                  <p className="mt-2 text-lg font-black leading-tight md:text-xl">Posts, stories and campaigns</p>
                </div>
                <div className="w-[72%] rounded-premium border border-white/10 bg-orange p-3 text-white">
                  <Video size={20} />
                  <p className="mt-4 text-base font-black leading-tight md:text-lg">Reels and short-form video</p>
                </div>
                <div className="ml-auto w-[68%] rounded-premium border border-white/10 bg-white/[0.08] p-3 text-white backdrop-blur">
                  <Camera className="text-orange" size={20} />
                  <p className="mt-4 text-base font-black leading-tight md:text-lg">Photography and shoots</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md-float-soft absolute bottom-14 left-2 w-[64%] rounded-premium border border-white/10 bg-deep/92 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange">01 / Digital Identity</p>
                <h2 className="mt-3 text-xl font-black leading-tight md:text-2xl">Strategy. Content. Creativity. Growth.</h2>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange text-white"><Play size={18} fill="currentColor" /></span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted md:text-sm">
              <span className="rounded-premium border border-white/10 p-3"><Megaphone className="mb-2 text-orange" size={17} />Social management</span>
              <span className="rounded-premium border border-white/10 p-3"><Palette className="mb-2 text-orange" size={17} />Creative designs</span>
            </div>
          </div>
          <div className="md-float-soft-alt absolute left-8 top-12 rounded-premium border border-white/10 bg-white px-4 py-3 text-sm font-black text-ink">02 / Content Studio</div>
          <div className="md-float-soft-slow absolute bottom-4 right-8 rounded-premium border border-white/10 bg-orange px-4 py-3 text-sm font-black text-white">03 / Brand Growth</div>
        </div>
      </div>
    </section>
  );
}
