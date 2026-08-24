import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { SEO } from "../components/SEO";
import { useContent } from "../hooks/useContent";

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function PackagePlanDetail() {
  const { slug = "" } = useParams();
  const { packageCategories, packages } = useContent();
  const plan = packages.find((item) => slugify(item.name) === slug);
  if (!plan) return <Missing />;

  return (
    <>
      <SEO seo={{ title: `${plan.name} Package | Maithil Digitals`, description: plan.description }} />
      <section className="bg-white px-4 pb-16 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange">Package Plan</p>
            <h1 className="mt-4 font-display text-5xl font-black leading-tight md:text-7xl">{plan.name}</h1>
            <p className="mt-6 text-xl leading-9 text-navy/65">{plan.description}</p>
            <Button className="mt-8" href="/contact">Discuss This Package</Button>
          </div>
          <div className="rounded-premium border border-navy/10 bg-[#F5F8FC] p-6 shadow-sm">
            <h2 className="text-2xl font-black">What it can include</h2>
            <ul className="mt-6 grid gap-3">
              {plan.features.map((feature) => <li key={feature} className="rounded-premium bg-white px-4 py-3 font-semibold text-navy shadow-sm">{feature}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black">Business categories this can support</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {packageCategories.map((category) => <a key={category.title} href={`/packages/category/${slugify(category.title)}`} className="rounded-premium border border-navy/10 bg-white p-5 font-black text-navy shadow-sm transition hover:border-orange">{category.title}</a>)}
          </div>
        </div>
      </section>
    </>
  );
}

export function PackageCategoryDetail() {
  const { slug = "" } = useParams();
  const { packageCategories, packages } = useContent();
  const category = packageCategories.find((item) => slugify(item.title) === slug);
  if (!category) return <Missing />;

  return (
    <>
      <SEO seo={{ title: `${category.title} Packages | Maithil Digitals`, description: category.description }} />
      <section className="bg-white px-4 pb-16 pt-36 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange">Package Category</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-black leading-tight md:text-7xl">{category.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-navy/65">{category.description}</p>
        </div>
      </section>
      <section className="bg-[#F5F8FC] px-4 py-16 text-navy sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-premium border border-navy/10 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Recommended services</h2>
            <div className="mt-6 grid gap-3">
              {category.services.map((service) => <span key={service} className="rounded-premium bg-[#F5F8FC] px-4 py-3 font-semibold">{service}</span>)}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {packages.map((plan) => (
              <article key={plan.name} className="flex min-h-72 flex-col rounded-premium border border-navy/10 bg-white p-5 shadow-sm transition hover:border-orange">
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <p className="mt-3 text-sm leading-7 text-navy/65">{plan.label}</p>
                <Button className="mt-auto w-full" href="/contact">Enquire Now</Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Missing() {
  return <section className="bg-white px-4 py-40 text-center text-navy"><h1 className="text-4xl font-black">Package not found</h1><Button className="mt-8" href="/packages">Back to packages</Button></section>;
}
