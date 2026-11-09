import { ContactShell } from "@/components/contact-context";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AISection } from "@/components/sections/ai-section";
import { CTA } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Trust } from "@/components/sections/trust";
import { Why } from "@/components/sections/why";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "en") as Locale;
  const dict = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OMNIGON",
    description: dict.meta.description,
    logo: "https://omnigon.example.com/logo-icon.svg",
    slogan: dict.footer.tagline,
  };

  return (
    <ContactShell dict={dict.form}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar dict={dict} lang={locale} />
      <main>
        <Hero dict={dict} />
        <Trust dict={dict} />
        <Services dict={dict} />
        <AISection dict={dict} />
        <Process dict={dict} />
        <Why dict={dict} />
        <CTA dict={dict} />
      </main>
      <Footer dict={dict} lang={locale} />
    </ContactShell>
  );
}
