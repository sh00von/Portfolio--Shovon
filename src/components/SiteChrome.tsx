"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { resolveFromVariant, withFromParam, type HomePath, type SharedFrom } from "@/lib/homeVariants";
import { MoonIcon, SunIcon } from "./icons";

const defaultNavItems = [
  { anchor: "#experience", label: "Experience" },
  { anchor: "#certifications", label: "Certifications" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { anchor: "#contact", label: "Connect" },
];

function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("ready");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isLight = theme === "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isLight ? "#f7f7f7" : "#171717");
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="theme-toggle inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm transition-colors"
        aria-label="Toggle theme"
      >
        <div className="w-4 h-4" />
      </button>
    );
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      className="theme-toggle inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm transition-colors"
      aria-label="Toggle theme"
      aria-pressed={isLight}
      onClick={toggleTheme}
    >
      {isLight ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function Navigation({
  active,
  homePath = "/dev",
  fromVariant,
}: {
  active?: "projects" | "blog";
  homePath?: HomePath;
  fromVariant?: SharedFrom;
}) {
  const [open, setOpen] = useState(false);
  const currentVariant = fromVariant ?? resolveFromVariant(homePath);
  const navItems =
    currentVariant === "academic"
      ? [
          { anchor: "#research", label: "Research" },
          defaultNavItems[1],
          defaultNavItems[2],
          defaultNavItems[3],
          defaultNavItems[4],
        ]
      : defaultNavItems;

  return (
    <nav
      className="sticky top-0 z-40 mx-auto w-full max-w-2xl border-b border-[#2a2a2a]/80 bg-[#171717]/90 px-4 py-4 backdrop-blur-md lg:max-w-[60vw] lg:py-5"
      aria-label="Main navigation"
    >
      {/* Issue #8: Skip-to-content link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="absolute -top-full left-4 z-50 rounded-md bg-[#EDEDED] px-4 py-2 text-sm font-medium text-[#171717] focus:top-4 transition-[top]"
      >
        Skip to main content
      </a>
      <div className="flex items-center justify-between">
        <Link
          href={homePath}
          className="font-medium tracking-tight text-[#EDEDED] transition-colors hover:text-gray-300"
          aria-label="Home"
        >
          Minaruzzaman Shovon
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const href =
              "anchor" in item ? `${homePath}${item.anchor}` : withFromParam(item.href, currentVariant);

            return (
              <Link
                key={href}
                href={href}
                aria-current={
                  (active === "projects" && item.label === "Projects") ||
                  (active === "blog" && item.label === "Blog")
                    ? "page"
                    : undefined
                }
                className={
                  (active === "projects" && item.label === "Projects") ||
                  (active === "blog" && item.label === "Blog")
                    ? "border-b border-[#444] pb-px text-[#EDEDED]"
                    : "text-[#888] transition-colors hover:text-[#EDEDED]"
                }
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeButton />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeButton />
          <button
            type="button"
            className="theme-toggle inline-flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className="block h-0.5 w-5 bg-current transition-all duration-300"
              style={{ transform: open ? "translateY(8px) rotate(45deg)" : undefined }}
            />
            <span
              className="block h-0.5 w-5 bg-current transition-all duration-300"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-0.5 w-5 bg-current transition-all duration-300"
              style={{ transform: open ? "translateY(-8px) rotate(-45deg)" : undefined }}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="overflow-hidden transition-all duration-300 ease-in-out md:hidden"
        style={{ maxHeight: open ? 220 : 0, opacity: open ? 1 : 0 }}
      >
        <div className="mt-4 flex flex-col gap-4 border-t border-[#2a2a2a] pt-5 pb-2 text-sm font-medium">
          {navItems.map((item) => {
            const href =
              "anchor" in item ? `${homePath}${item.anchor}` : withFromParam(item.href, currentVariant);

            return (
              <Link
                key={href}
                href={href}
                className={
                  (active === "projects" && item.label === "Projects") ||
                  (active === "blog" && item.label === "Blog")
                    ? "text-[#EDEDED]"
                    : "text-[#888] transition-colors hover:text-[#EDEDED]"
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function Footer({ backHome = false, homePath = "/dev" }: { backHome?: boolean; homePath?: HomePath }) {
  return (
    <footer className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between px-4 pb-10 text-sm text-[#555] sm:flex-row lg:max-w-[60vw]">
      <span>&copy; 2026 Minaruzzaman Shovon</span>
      <div className="flex items-center gap-4">
        <Link href="/sitemap.xml" className="back-link">
          Sitemap
        </Link>
        <Link href="/feed.xml" className="back-link">
          Feed
        </Link>
        {backHome ? (
          <Link href={homePath} className="back-link">
            &larr; Home
          </Link>
        ) : null}
      </div>
    </footer>
  );
}
