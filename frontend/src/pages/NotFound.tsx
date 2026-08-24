import { Button } from "../components/Button";
import { SEO } from "../components/SEO";

export function NotFound() {
  return (
    <>
      <SEO seo={{ title: "Page Not Found | Maithil Digitals", description: "The requested page could not be found.", robots: "noindex,nofollow" }} />
      <section className="grid min-h-screen place-items-center bg-ink px-4 text-center text-white">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-orange">404</p>
          <h1 className="mt-4 font-display text-5xl font-black">Page not found.</h1>
          <Button className="mt-8" href="/">Back home</Button>
        </div>
      </section>
    </>
  );
}
