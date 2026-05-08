import Link from "next/link";
import {
  achievements,
  certifications,
  education,
  experience,
  gallery,
  publications,
  skills,
  socials,
  volunteers,
} from "@/data/home";
import { GalleryImage } from "./GalleryLightbox";

function DotLinks({ links }: { links: readonly (readonly [string, string])[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#666]">
      {links.map(([label, href], index) => (
        <span key={label} className="contents">
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          <Link
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={label === "hello@shovon.bd" ? "font-medium text-[#EDEDED] hover:underline" : "transition-colors hover:text-[#EDEDED]"}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  );
}

function LineItem({
  title,
  meta,
  href,
}: {
  title: string;
  meta: string;
  href?: string;
}) {
  const content = href ? (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#EDEDED] underline-offset-4 hover:underline decoration-[#555]"
    >
      {title}
    </Link>
  ) : (
    <span className="font-medium text-[#EDEDED]">{title}</span>
  );

  return (
    <div className="group flex flex-col justify-between sm:flex-row sm:items-baseline">
      {content}
      <div className="mx-4 hidden flex-grow border-b border-[#333] transition-colors group-hover:border-[#555] sm:block" />
      <span className="text-sm tabular-nums text-[#666]">{meta}</span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="mt-14 mb-20">
      <div className="max-w-4xl">
        <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tighter text-[#EDEDED] sm:text-5xl lg:text-[3.7rem]">
          Building fast, thoughtful web products.
        </h1>
        <p className="mb-8 max-w-3xl text-base leading-8 text-[#d4d4d4] sm:text-lg">
          I&apos;m <span className="font-medium text-[#EDEDED]">Md Minaruzzaman Shovon</span>, a full-stack developer focused
          on Next.js, TypeScript, modern UI systems, and AI-powered product experiences, with a background in water
          resources engineering and GIS.
        </p>
        <div className="mb-8 flex flex-wrap gap-2 text-xs text-[#888]">
          <span className="rounded-full border border-[#333] bg-[#1a1a1a] px-3 py-1">Next.js</span>
          <span className="rounded-full border border-[#333] bg-[#1a1a1a] px-3 py-1">TypeScript</span>
          <span className="rounded-full border border-[#333] bg-[#1a1a1a] px-3 py-1">UI Engineering</span>
          <span className="rounded-full border border-[#333] bg-[#1a1a1a] px-3 py-1">AI Apps</span>
          <span className="rounded-full border border-[#333] bg-[#1a1a1a] px-3 py-1">GIS</span>
          <span className="rounded-full border border-[#333] bg-[#1a1a1a] px-3 py-1">Data Visualization</span>
        </div>
        <div className="rounded-2xl border border-[#2e2e2e] bg-[#1a1a1a]/80 p-5 sm:p-6">
          <p className="mb-3 text-sm font-medium text-[#EDEDED]">Based in Chattogram, building for the web.</p>
          <p className="mb-4 max-w-2xl text-sm leading-7 text-[#8d8d8d]">
            Recent work spans developer-focused interfaces, portfolio systems, interactive maps, blog architecture, and
            practical software for engineering-heavy use cases.
          </p>
          <DotLinks links={socials} />
        </div>
      </div>
    </section>
  );
}

export function SimpleListSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: readonly (readonly [string, string] | readonly [string, string, string])[];
}) {
  return (
    <section id={id} className="mb-20">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-[#EDEDED]">{title}</h2>
      <div className="flex flex-col space-y-2">
        {items.map((item) =>
          item.length === 3 ? (
            <LineItem key={item[0]} title={item[0]} href={item[1]} meta={item[2]} />
          ) : (
            <LineItem key={item[0]} title={item[0]} meta={item[1]} />
          ),
        )}
      </div>
    </section>
  );
}

export function PublicationsSection() {
  return (
    <section id="research" className="mb-20">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-[#EDEDED]">Publications</h2>
      <p className="mb-6 text-sm leading-relaxed text-[#a1a1a1]">
        <span className="font-medium text-[#EDEDED]">Research Interests:</span> Environmental analysis, hydrological
        modeling, and sustainable water infrastructure.
      </p>
      <div className="flex flex-col space-y-8">
        {publications.map((publication) => (
          <Link
            key={publication.title}
            href={publication.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block no-underline"
          >
            <div className="mb-2 flex flex-col justify-between sm:flex-row sm:items-start">
              <h3 className="max-w-lg font-medium leading-snug text-[#EDEDED] underline-offset-4 group-hover:underline decoration-[#555]">
                {publication.title}
              </h3>
              <span className="mt-1 flex-shrink-0 text-sm tabular-nums text-[#666] sm:mt-0 sm:ml-4">
                {publication.date}
              </span>
            </div>
            <p className="mb-2 text-sm text-[#888]">{publication.authors}</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded border border-[#333] bg-[#1a1a1a] px-2 py-0.5 text-xs font-medium text-[#888]">
                {publication.label}
              </span>
              {"featured" in publication ? (
                <span className="badge-featured inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium">
                  {publication.featured}
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="mb-20">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-[#EDEDED]">Achievements</h2>
      <div className="flex flex-col space-y-4">
        {achievements.map(([title, org, year]) => (
          <div key={title} className="group flex flex-col justify-between sm:flex-row sm:items-baseline">
            <div>
              <span className="font-medium text-[#EDEDED]">{title}</span>
              <p className="mt-0.5 text-sm text-[#888]">{org}</p>
            </div>
            <div className="mx-4 hidden flex-grow border-b border-[#333] transition-colors group-hover:border-[#555] sm:block" />
            <span className="flex-shrink-0 text-sm tabular-nums text-[#666]">{year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" className="mb-20">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-[#EDEDED]">Gallery</h2>
      <p className="mb-6 leading-relaxed text-[#a1a1a1]">
        A visual journey through my interests in engineering, development, and the environment.
      </p>
      <div className="columns-2 gap-4 sm:columns-3 sm:gap-6">
        {gallery.map(([src, alt]) => (
          <div
            key={src}
            className="spotlight-card group mb-4 break-inside-avoid overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a] sm:mb-6"
          >
            <GalleryImage src={src} alt={alt} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="uses" className="mb-20">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-[#EDEDED]">Skills</h2>
      <p className="mb-6 leading-relaxed text-[#a1a1a1]">
        Technologies and tools I use to design, build, and ship products.
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm text-[#888] sm:grid-cols-4">
        {skills.map(([heading, ...items]) => (
          <ul key={heading} className="space-y-2">
            <li className="mb-1 font-medium text-[#EDEDED]">{heading}</li>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="mb-20">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-[#EDEDED]">Connect</h2>
      <p className="mb-6 text-[#a1a1a1]">I&apos;m always open to discussing new opportunities.</p>
      <DotLinks links={[["hello@shovon.bd", "mailto:hello@shovon.bd"], ...socials.slice(1, 5)]} />
    </section>
  );
}

export const homeLists = {
  education,
  experience,
  volunteers,
  certifications,
};
