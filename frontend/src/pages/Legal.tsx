import { SectionHeading } from "../components/SectionHeading";
import { SEO } from "../components/SEO";

export function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" description="How Maithil Digitals handles enquiry and website information." />;
}

export function TermsAndConditions() {
  return <LegalPage title="Terms & Conditions" description="General terms for using the Maithil Digitals website and starting service conversations." />;
}

function LegalPage({ title, description }: { title: string; description: string }) {
  return (
    <>
      <SEO seo={{ title: `${title} | Maithil Digitals`, description }} />
      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><SectionHeading title={title} description={description} /></div></section>
      <section className="bg-bone px-4 py-20 text-ink sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl space-y-6 text-lg leading-8 text-ink/70"><p>This page is structured for CMS-managed legal content. Replace this draft with reviewed business-specific policy text before production launch.</p><p>Visitors can contact Maithil Digitals using the details on the contact page for privacy, service or website questions.</p></div></section>
    </>
  );
}
