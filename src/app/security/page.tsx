import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
  description:
    "Security advisories and CVE disclosures by Md Minaruzzaman Shovon. WordPress vulnerability research including PHP Object Injection and Broken Access Control findings.",
  alternates: {
    canonical: "https://shovon.bd/security",
  },
  keywords: [
    "CVE",
    "security research",
    "WordPress vulnerabilities",
    "responsible disclosure",
    "Md Minaruzzaman Shovon",
    "CVE-2026-14322",
    "CVE-2026-10749",
    "CVE-2026-57661",
    "WPScan",
    "Patchstack",
    "security advisory",
    "WordPress plugin vulnerabilities",
  ],
  openGraph: {
    type: "website",
    url: "https://shovon.bd/security",
    siteName: "Shovon Portfolio",
    title: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
    description:
      "Security advisories and CVE disclosures by Md Minaruzzaman Shovon. WordPress vulnerability research including PHP Object Injection and Broken Access Control findings.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sh00von",
    title: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
    description:
      "Security advisories and CVE disclosures by Md Minaruzzaman Shovon. WordPress vulnerability research including PHP Object Injection and Broken Access Control findings.",
    images: ["/og.png"],
  },
};

const cves = [
  {
    id: "CVE-2026-14322",
    href: "/security/cve-2026-14322",
    title: "Unauthenticated Booking Auto-Approval in Timetics",
    plugin: "Timetics",
    severity: "MEDIUM",
    cvss: "5.3",
    disclosed: "Jul 2026",
    description:
      "Missing payment method verification and status enforcement allows unauthenticated users to create fully-approved bookings for priced appointments without payment. Patched in 1.0.57.",
  },
  {
    id: "CVE-2026-10749",
    href: "/security/cve-2026-10749",
    title: "PHP Object Injection in Post Duplicator",
    plugin: "Post Duplicator",
    severity: "HIGH",
    cvss: "7.2",
    disclosed: "Jun 2026",
    description:
      "Unsanitized input passed to PHP's unserialize() via the customMetaData parameter allows Contributor-level users to inject arbitrary PHP objects, potentially leading to RCE when a gadget chain is present. Patched in 3.0.15.",
  },
  {
    id: "CVE-2026-57661",
    href: "/security/cve-2026-57661",
    title: "Broken Access Control in WPComplete",
    plugin: "WPComplete",
    severity: "MEDIUM",
    cvss: "5.4",
    disclosed: "Jun 2026",
    description:
      "Missing authorization checks and nonce validation on a sensitive function allows Subscriber-level users to perform privileged actions including manipulating course completion records for arbitrary users. Patched in 2.9.5.6.",
  },
];

export default function SecurityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
    description:
      "Security advisories and CVE disclosures by Md Minaruzzaman Shovon including vulnerabilities in Timetics, Post Duplicator, and WPComplete.",
    url: "https://shovon.bd/security",
    author: {
      "@type": "Person",
      name: "Md Minaruzzaman Shovon",
      url: "https://shovon.bd/dev",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cves.map((cve, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TechArticle",
          name: cve.title,
          identifier: cve.id,
          url: `https://shovon.bd${cve.href}`,
          description: cve.description,
        },
      })),
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation active="security" />

      <main id="main-content" className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 lg:max-w-[60vw]">
        <div className="mb-1 flex items-center gap-2 text-xs text-[#737373]">
          <Link href="/dev" className="hover:text-[#111111] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Security Research</span>
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
          Security Research
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-7 text-[#5c5c5c]">
          CVE advisories from responsible disclosure of WordPress plugin vulnerabilities.
          All findings were reported to the relevant vendor or disclosure program prior to publication.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {cves.map((cve) => (
            <Link
              key={cve.id}
              href={cve.href}
              className="group flex flex-col gap-3 rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-5 py-5 transition-colors hover:border-[#d4d4d4] hover:bg-white"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-semibold text-[#111111]">{cve.id}</span>
                <span
                  className="inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold"
                  style={
                    cve.severity === "HIGH"
                      ? { background: "#fef2f2", color: "#991b1b", borderColor: "#fca5a5" }
                      : { background: "#fffbeb", color: "#92400e", borderColor: "#fcd34d" }
                  }
                >
                  {cve.severity} — CVSS {cve.cvss}
                </span>
                <span className="ml-auto text-xs text-[#737373]">{cve.disclosed}</span>
              </div>
              <p className="text-sm font-medium text-[#111111]">{cve.title}</p>
              <p className="text-sm leading-6 text-[#5c5c5c]">{cve.description}</p>
              <div className="flex items-center text-xs text-[#737373] transition-colors group-hover:text-[#111111]">
                <span>Plugin: {cve.plugin}</span>
                <span className="ml-auto">View advisory →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer backHome homePath="/dev" />
    </div>
  );
}
