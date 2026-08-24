import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SEO } from "../components/SEO";
import { useContent } from "../hooks/useContent";

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function Packages() {
  const { packageCategories, packages } = useContent();
  return (
    <>
      <SEO seo={{ title: "Packages | Maithil Digitals", description: "Digital marketing and content packages for restaurants, schools, real estate, salons, hotels, fashion, jewellery and local businesses." }} />
      <section className="bg-white px-4 pb-16 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange">Packages</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-black leading-tight md:text-7xl">Find the right plan for your business.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-navy/65">Choose a plan or open a business category to see the package direction for that type of business.</p>
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl auto-rows-fr gap-6 md:grid-cols-3">
          {packages.map((plan) => (
            <article key={plan.name} className={`relative flex h-full min-h-[380px] flex-col rounded-premium border bg-white p-6 shadow-sm ${plan.badge ? "border-orange" : "border-navy/10"}`}>
              {plan.badge ? <span className="absolute right-5 top-5 rounded-full bg-orange px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">{plan.badge}</span> : null}
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">{plan.label}</p>
              <h2 className="mt-5 text-3xl font-black text-navy">{plan.name}</h2>
              <p className="mt-4 leading-7 text-navy/65">{plan.description}</p>
              <ul className="mt-6 grid gap-3 text-sm font-semibold text-navy/70">
                {plan.features.map((feature) => <li key={feature} className="rounded-premium bg-[#F5F8FC] px-3 py-2">{feature}</li>)}
              </ul>
              <Button className="mt-auto w-full" href={`/packages/plan/${slugify(plan.name)}`}>{plan.cta}</Button>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-black">Package categories</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {packageCategories.map((category) => (
              <Link key={category.title} to={`/packages/category/${slugify(category.title)}`} className="rounded-premium border border-navy/10 bg-white p-5 text-navy shadow-sm transition hover:-translate-y-1 hover:border-orange">
                <h3 className="font-black">{category.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-navy/65">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
