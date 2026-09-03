import type { Media } from "../types/content";
import { AnimatedWords } from "./AnimatedWords";
import { Button } from "./Button";
import { Image } from "./Image";

export function Hero({ images = [] }: { images?: Media[] }) {
  return (
    <section className="fade-hero premium-video-hero">
      <div className="fade-hero__media" aria-hidden="true">
        {images.slice(0, 3).map((image, index) => (
          <Image key={image.src} media={image} className="fade-hero__image" width={1800} loading={index === 0 ? "eager" : "lazy"} />
        ))}
      </div>
      <div className="fade-hero__shade" />
      <div className="fade-hero__inner">
        <div className="premium-video-hero__copy hme-reveal">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-orange"><AnimatedWords text="Digital Marketing Creative Growth" /></p>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-black leading-[0.94] md:text-7xl xl:text-[88px]">
            <span><AnimatedWords text="Your brand." /></span>{" "}
            <span><AnimatedWords text="Your story." startDelay={220} /></span>{" "}
            <span><AnimatedWords text="Your digital identity." startDelay={440} /></span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
            <AnimatedWords text="We help businesses build a stronger digital presence through strategic social media, creative content, professional photography, reels, branding and digital marketing." startDelay={720} />
          </p>
          <div className="fade-hero__actions">
            <Button className="fade-hero__link" href="/contact">Get Started</Button>
            <Button className="fade-hero__link" href="/work" variant="secondary">View Our Work</Button>
          </div>
        </div>
        <div className="premium-video-hero__visual hme-reveal">
          <div className="premium-video-hero__frame">
            <video autoPlay muted loop playsInline preload="auto" poster="/brand/logo.jpg.jpeg">
              <source src="/brand/maithil-digitals-hero.mp4" type="video/mp4" />
            </video>
          </div>
          <span className="premium-video-hero__accent premium-video-hero__accent--one" />
          <span className="premium-video-hero__accent premium-video-hero__accent--two" />
        </div>
      </div>
    </section>
  );
}
