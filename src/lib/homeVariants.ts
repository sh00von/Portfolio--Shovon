import type { Metadata } from "next";
import {
  achievements,
  certifications,
  education,
  experience,
  gallery,
  publications,
  skills,
  volunteers,
} from "@/data/home";

export type HomeVariant = "dev" | "wre";
export type HomePath = "/" | "/dev" | "/wre";

const siteUrl = "https://shovon.bd";

type SimpleItem = readonly [string, string];
type LinkedItem = readonly [string, string, string];
type PublicationItem = (typeof publications)[number];
type SkillGroup = (typeof skills)[number];
type GalleryItem = (typeof gallery)[number];
type AchievementItem = (typeof achievements)[number];

type VariantContent = {
  shortLabel: string;
  hero: {
    headline: string;
    intro: string;
    support: string;
    pills: string[];
    summaryEyebrow: string;
    summaryText: string;
  };
  publications: {
    title: string;
    intro: string;
  };
  skills: {
    intro: string;
  };
  contact: {
    intro: string;
  };
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    jobTitle: string;
    profileDescription: string;
    knowsAbout: string[];
  };
};

type HomeVariantData = {
  education: readonly SimpleItem[];
  experience: readonly LinkedItem[];
  volunteers: readonly LinkedItem[];
  publications: readonly PublicationItem[];
  certifications: readonly SimpleItem[];
  achievements: readonly AchievementItem[];
  gallery: readonly GalleryItem[];
  skills: readonly SkillGroup[];
};

export const homeVariantContent: Record<HomeVariant, VariantContent> = {
  dev: {
    shortLabel: "Dev",
    hero: {
      headline: "Building fast, thoughtful web products.",
      intro:
        "I'm Md Minaruzzaman Shovon, a full-stack developer focused on Next.js, TypeScript, modern UI systems, and AI-powered product experiences, with a background in water resources engineering and GIS.",
      support:
        "I care about interfaces that feel clear, quick, and quietly capable, especially when the product has real-world data, mapping, or technical depth behind it.",
      pills: ["Next.js", "TypeScript", "UI Engineering", "AI Apps", "GIS", "Data Visualization"],
      summaryEyebrow: "Based in Chattogram, building for the web.",
      summaryText:
        "Recent work spans developer-focused interfaces, portfolio systems, interactive maps, blog architecture, and practical software for engineering-heavy use cases.",
    },
    publications: {
      title: "Publications",
      intro:
        "Research and technical writing that reflect the analytical side of how I approach software, modeling, and environmental systems.",
    },
    skills: {
      intro: "Technologies and tools I use to design, build, and ship products.",
    },
    contact: {
      intro: "I'm always open to discussing product, engineering, and collaborative opportunities.",
    },
    metadata: {
      title: "Md Minaruzzaman Shovon | Full Stack Developer",
      description:
        "Full stack developer portfolio of Md Minaruzzaman Shovon, focused on Next.js, TypeScript, AI integration, GIS, and high-performance web applications.",
      ogTitle: "Md Minaruzzaman Shovon | Full Stack Developer",
      ogDescription:
        "Full stack developer building fast, thoughtful web products across Next.js, AI integration, mapping, and data-rich interfaces.",
      jobTitle: "Full Stack Developer",
      profileDescription:
        "Full stack developer focused on Next.js, TypeScript, AI integration, GIS, and high-performance web applications.",
      knowsAbout: [
        "Full Stack Development",
        "Next.js",
        "React",
        "TypeScript",
        "AI Integration",
        "UI Engineering",
        "GIS",
        "Data Visualization",
      ],
    },
  },
  wre: {
    shortLabel: "WRE",
    hero: {
      headline: "Exploring water systems, modeling, and environmental analysis.",
      intro:
        "I'm Md Minaruzzaman Shovon, a water resources engineering undergraduate at CUET working across hydrology, hydraulics, GIS, environmental analysis, and applied computational tools.",
      support:
        "My engineering work is grounded in river systems, rainfall, air quality, spatial analysis, and practical modeling, with software helping me make those systems easier to analyze and communicate.",
      pills: ["Hydrology", "Hydraulics", "GIS", "Environmental Analysis", "Research", "Modeling"],
      summaryEyebrow: "Based in Chattogram, studying and building in water systems.",
      summaryText:
        "Current interests include hydrological modeling, remote sensing, environmental monitoring, and research-led engineering tools for decision-making.",
    },
    publications: {
      title: "Research & Publications",
      intro:
        "Research is a central part of this work, especially around hydrology, environmental monitoring, rainfall analysis, and applied machine learning for water-related systems.",
    },
    skills: {
      intro: "Methods, software, and technical tools I use across hydrology, GIS, analysis, and engineering workflows.",
    },
    contact: {
      intro: "I'm open to research, engineering, GIS, and interdisciplinary collaboration.",
    },
    metadata: {
      title: "Md Minaruzzaman Shovon | Water Resources Engineering",
      description:
        "Water resources engineering portfolio of Md Minaruzzaman Shovon, covering hydrology, hydraulics, GIS, environmental analysis, research, and modeling.",
      ogTitle: "Md Minaruzzaman Shovon | Water Resources Engineering",
      ogDescription:
        "Water resources engineering work spanning hydrology, GIS, environmental analysis, modeling, and research-driven technical practice.",
      jobTitle: "Water Resources Engineering Undergraduate",
      profileDescription:
        "Water resources engineering undergraduate at CUET focused on hydrology, hydraulics, GIS, environmental analysis, and research-driven modeling.",
      knowsAbout: [
        "Water Resources Engineering",
        "Hydrology",
        "Hydraulics",
        "Environmental Engineering",
        "GIS",
        "Remote Sensing",
        "Hydrological Modeling",
        "Rainfall Analysis",
      ],
    },
  },
};

export const homeVariantData: Record<HomeVariant, HomeVariantData> = {
  dev: {
    education,
    experience,
    volunteers,
    publications: [],
    certifications,
    achievements,
    gallery,
    skills: skills.filter(([heading]) => heading !== "GIS/ML Modelling"),
  },
  wre: {
    education,
    experience: [],
    volunteers,
    publications,
    certifications,
    achievements,
    gallery,
    skills: skills.filter(([heading]) => heading === "GIS/ML Modelling"),
  },
};

export function getHomeMetadata(variant: HomeVariant, canonicalPath: HomePath): Metadata {
  const meta = homeVariantContent[variant].metadata;
  const canonicalUrl = `${siteUrl}${canonicalPath === "/" ? "/" : canonicalPath}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@sh00von",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: ["/og.png"],
    },
  };
}

export function getProfileJsonLd(variant: HomeVariant, pagePath: HomePath) {
  const meta = homeVariantContent[variant].metadata;
  const pageUrl = `${siteUrl}${pagePath === "/" ? "/" : pagePath}`;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00+06:00",
    dateModified: "2026-05-08T12:00:00+06:00",
    mainEntity: {
      "@type": "Person",
      name: "Md Minaruzzaman Shovon",
      alternateName: "Shovon",
      jobTitle: meta.jobTitle,
      url: pageUrl,
      image: "https://shovon.bd/shovon.jpg",
      description: meta.profileDescription,
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Chittagong University of Engineering and Technology (CUET)",
      },
      knowsAbout: meta.knowsAbout,
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
}
