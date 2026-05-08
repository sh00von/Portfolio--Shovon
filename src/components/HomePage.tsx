import Script from "next/script";
import { Footer, Navigation } from "@/components/SiteChrome";
import {
  AchievementsSection,
  ContactSection,
  GallerySection,
  HeroSection,
  PublicationsSection,
  SimpleListSection,
  SkillsSection,
} from "@/components/HomeSections";
import { getProfileJsonLd, homeVariantData, type HomePath, type HomeVariant } from "@/lib/homeVariants";

export function HomePage({ variant, homePath }: { variant: HomeVariant; homePath: HomePath }) {
  const jsonLd = getProfileJsonLd(variant, homePath);
  const homeData = homeVariantData[variant];

  return (
    <div className="flex min-h-screen flex-col bg-[#171717] text-[#EDEDED] antialiased">
      <Script
        id={`profile-json-ld-${variant}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation homePath={homePath} />
      <main id="main-content" className="mx-auto w-full max-w-2xl flex-grow px-4 pb-20 lg:max-w-[60vw]">
        <HeroSection variant={variant} currentPath={homePath} />
        {homeData.education.length ? <SimpleListSection id="education" title="Education" items={homeData.education} /> : null}
        {homeData.experience.length ? (
          <SimpleListSection id="experience" title="Work Experience" items={homeData.experience} />
        ) : null}
        {homeData.volunteers.length ? (
          <SimpleListSection id="volunteer-experience" title="Volunteer Experience" items={homeData.volunteers} />
        ) : null}
        {homeData.publications.length ? <PublicationsSection variant={variant} items={homeData.publications} /> : null}
        {homeData.certifications.length ? (
          <SimpleListSection id="certifications" title="Certifications" items={homeData.certifications} />
        ) : null}
        {homeData.achievements.length ? <AchievementsSection items={homeData.achievements} /> : null}
        {homeData.gallery.length ? <GallerySection items={homeData.gallery} /> : null}
        {homeData.skills.length ? <SkillsSection variant={variant} items={homeData.skills} /> : null}
        <ContactSection variant={variant} />
      </main>
      <Footer />
    </div>
  );
}
