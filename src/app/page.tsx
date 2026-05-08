import type { Metadata } from "next";
import Script from "next/script";
import { Footer, Navigation } from "@/components/SiteChrome";
import {
  AchievementsSection,
  ContactSection,
  GallerySection,
  HeroSection,
  homeLists,
  PublicationsSection,
  SimpleListSection,
  SkillsSection,
} from "@/components/HomeSections";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://shovon.bd/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateCreated: "2024-01-01T00:00:00+06:00",
  dateModified: "2026-03-20T15:10:00+06:00",
  mainEntity: {
    "@type": "Person",
    name: "Md Minaruzzaman Shovon",
    alternateName: "Shovon",
    jobTitle: "Water Resources Engineering Undergraduate and Full Stack Developer",
    url: "https://shovon.bd",
    image: "https://shovon.bd/shovon.jpg",
    description:
      "Water Resources Engineering undergraduate at CUET focused on hydrological modeling, environmental analysis, and AI-powered web applications.",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Chittagong University of Engineering and Technology (CUET)",
    },
    knowsAbout: [
      "Hydrology",
      "Hydrological Modeling",
      "Hydraulics",
      "Environmental Engineering",
      "Water Resources Engineering",
      "Full Stack Development",
      "AI Integration",
    ],
    knowsLanguage: ["English", "Bengali"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Bangladesh",
    },
    sameAs: [
      "https://github.com/sh00von",
      "https://twitter.com/sh00von",
      "https://www.linkedin.com/in/minarsvn9090/",
      "https://scholar.google.com/citations?user=tht8Z1oAAAAJ&hl=en",
      "https://www.researchgate.net/profile/Md-Shovon-13",
      "https://www.facebook.com/minar.svn",
    ],
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#171717] text-[#EDEDED] antialiased">
      <Script
        id="profile-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main id="main-content" className="mx-auto w-full max-w-2xl flex-grow px-4 pb-20 lg:max-w-[60vw]">
        <HeroSection />
        <SimpleListSection id="education" title="Education" items={homeLists.education} />
        <SimpleListSection id="experience" title="Work Experience" items={homeLists.experience} />
        <SimpleListSection id="volunteer-experience" title="Volunteer Experience" items={homeLists.volunteers} />
        <PublicationsSection />
        <SimpleListSection id="certifications" title="Certifications" items={homeLists.certifications} />
        <AchievementsSection />
        <GallerySection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
