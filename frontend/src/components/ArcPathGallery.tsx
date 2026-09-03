import { AnimatedWords } from "./AnimatedWords";

export function ArcPathGallery() {
  return (
    <section className="arc-hero">
      <div className="arc-hero__video" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/brand/maithil-digitals-hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="arc-hero__wash" aria-hidden="true" />
      <div className="arc-hero__inner">
        <div className="arc-hero__copy hme-reveal">
          <p className="arc-hero__eyebrow"><AnimatedWords text="Maithil Digitals" /></p>
          <h1>
            <span><AnimatedWords text="Your Digital" /></span>
            <span><AnimatedWords text="Identity" startDelay={260} /></span>
          </h1>
          <p className="arc-hero__summary">
            <AnimatedWords text="Premium content, campaigns and digital marketing for brands that want to look sharp everywhere they appear." startDelay={560} />
          </p>
          <div className="arc-hero__motion-text" aria-hidden="true">
            <span>Strategy</span>
            <span>Content</span>
            <span>Growth</span>
          </div>
        </div>
      </div>
    </section>
  );
}
