"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

type CommandItem = {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Security Disclosures" | "Android Apps" | "Projects" | "Quick Actions";
  icon?: string;
  badge?: string;
  action: () => void;
};

export function CommandPaletteTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-[#e5e5e5] bg-[#f5f5f5] px-2.5 py-1.5 text-xs font-medium text-[#5c5c5c] transition-colors hover:border-[#d4d4d4] hover:bg-white hover:text-[#111111]"
      aria-label="Open Command Palette (Cmd + K)"
    >
      <svg
        className="h-3.5 w-3.5 text-[#737373]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden rounded border border-[#d4d4d4] bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#737373] sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open palette
          const trigger = document.querySelector<HTMLButtonElement>("button[aria-label*='Command Palette']");
          trigger?.click();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const navigateTo = (path: string, external = false) => {
    onClose();
    if (external) {
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      router.push(path);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
      onClose();
    }, 1000);
  };

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-dev",
      title: "Developer Portfolio",
      subtitle: "Next.js, TypeScript, UI Engineering & GIS",
      category: "Navigation",
      badge: "/dev",
      action: () => navigateTo("/dev"),
    },
    {
      id: "nav-academic",
      title: "Water Resources Engineering Portfolio",
      subtitle: "CUET hydrology, river analysis & environmental research",
      category: "Navigation",
      badge: "/academic",
      action: () => navigateTo("/academic"),
    },
    {
      id: "nav-security",
      title: "Security Advisories & Research",
      subtitle: "CVE disclosures and WordPress security fixes",
      category: "Navigation",
      badge: "/security",
      action: () => navigateTo("/security"),
    },
    {
      id: "nav-apps",
      title: "Android Apps Directory",
      subtitle: "Offline-first tools published on Google Play Store",
      category: "Navigation",
      badge: "/apps",
      action: () => navigateTo("/apps"),
    },
    {
      id: "nav-projects",
      title: "Projects & Portfolio Showcase",
      subtitle: "Full-stack, AI, and GIS spatial modeling applications",
      category: "Navigation",
      badge: "/projects",
      action: () => navigateTo("/projects"),
    },

    // Security Disclosures
    {
      id: "cve-14322",
      title: "CVE-2026-14322 — Timetics Unauthenticated Booking Auto-Approval",
      subtitle: "Medium 5.3 CVSS • Broken Access Control vulnerability in Timetics < 1.0.57",
      category: "Security Disclosures",
      badge: "CVE",
      action: () => navigateTo("/security/cve-2026-14322"),
    },
    {
      id: "cve-10749",
      title: "CVE-2026-10749 — Post Duplicator PHP Object Injection",
      subtitle: "High 7.2 CVSS • PHP Object Injection vulnerability in Post Duplicator ≤ 3.0.14",
      category: "Security Disclosures",
      badge: "CVE",
      action: () => navigateTo("/security/cve-2026-10749"),
    },
    {
      id: "cve-57661",
      title: "CVE-2026-57661 — WPComplete Broken Access Control",
      subtitle: "Medium 5.4 CVSS • Subscriber privilege escalation vulnerability in WPComplete ≤ 2.9.5.5",
      category: "Security Disclosures",
      badge: "CVE",
      action: () => navigateTo("/security/cve-2026-57661"),
    },
    {
      id: "mappress",
      title: "MapPress Maps 2.97.2 Security Assistance Credit",
      subtitle: "Changelog recognition: 'Thanks to https://shovon.bd for security assistance in 2.97'",
      category: "Security Disclosures",
      badge: "Credit",
      action: () => navigateTo("https://wordpress.org/plugins/mappress-google-maps-for-wordpress/#developers", true),
    },

    // Android Apps
    {
      id: "app-attendly",
      title: "Attendly Tutor",
      subtitle: "Offline-first attendance management for tutors & educators",
      category: "Android Apps",
      badge: "Play Store",
      action: () => navigateTo("/apps/attendly-tutor"),
    },
    {
      id: "app-mono",
      title: "Mono Alarm",
      subtitle: "Minimalist alarm & timer utility with customizable wake triggers",
      category: "Android Apps",
      badge: "Play Store",
      action: () => navigateTo("/apps/mono-alarm"),
    },
    {
      id: "app-nu",
      title: "NU Assistant BD",
      subtitle: "National University Bangladesh GPA calculator & result parser",
      category: "Android Apps",
      badge: "Play Store",
      action: () => navigateTo("/apps/nu-assistant-bd"),
    },
    {
      id: "app-chalk",
      title: "Chalk",
      subtitle: "Distraction-free canvas drawing app for sketches & quick notes",
      category: "Android Apps",
      badge: "Play Store",
      action: () => navigateTo("/apps/chalk"),
    },

    // Projects
    {
      id: "proj-inquilab",
      title: "The Inquilab — Open Source Protest Archive & API",
      subtitle: "Featured in The Daily Star • Historical archive & API of July 2024 revolution",
      category: "Projects",
      badge: "Featured",
      action: () => navigateTo("https://www.thedailystar.net/tech-startup/news/digital-resistance-websites-kept-the-revolution-alive-3677231", true),
    },

    // Quick Actions
    {
      id: "act-email",
      title: "Copy Email Address",
      subtitle: "hello@shovon.bd",
      category: "Quick Actions",
      badge: "Action",
      action: () => copyToClipboard("hello@shovon.bd", "Email copied!"),
    },
    {
      id: "act-github",
      title: "Open GitHub Profile",
      subtitle: "github.com/sh00von",
      category: "Quick Actions",
      badge: "External",
      action: () => navigateTo("https://github.com/sh00von", true),
    },
    {
      id: "act-patchstack",
      title: "Open Patchstack Security Profile",
      subtitle: "vdp.patchstack.com/database/researchers/...",
      category: "Quick Actions",
      badge: "External",
      action: () => navigateTo("https://vdp.patchstack.com/database/researchers/093a22ad-bf3b-4fd3-96cf-9e6cef3eb7db", true),
    },
    {
      id: "act-rss",
      title: "View RSS Security Feed",
      subtitle: "/rss.xml",
      category: "Quick Actions",
      badge: "RSS",
      action: () => navigateTo("/rss.xml", true),
    },
    {
      id: "act-llm",
      title: "View LLM / AI Summary",
      subtitle: "/llms.txt",
      category: "Quick Actions",
      badge: "AI",
      action: () => navigateTo("/llms.txt", true),
    },
  ];

  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const categories = Array.from(new Set(filteredItems.map((i) => i.category)));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  let globalIndexCounter = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-2xl transition-all dark:border-[#27272a] dark:bg-[#09090b]">
        {/* Search input header */}
        <div className="flex items-center border-b border-[#e5e5e5] px-4 dark:border-[#27272a]">
          <svg
            className="h-5 w-5 text-[#737373]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search CVEs, apps, research, projects, links..."
            className="w-full bg-transparent px-3 py-4 text-sm text-[#111111] outline-none placeholder:text-[#737373] dark:text-[#f4f4f5]"
          />
          {copiedText ? (
            <span className="rounded bg-[#22c55e]/10 px-2 py-1 text-xs font-semibold text-[#166534] dark:text-[#4ade80]">
              {copiedText}
            </span>
          ) : (
            <kbd className="rounded border border-[#e5e5e5] bg-[#f5f5f5] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#737373] dark:border-[#27272a] dark:bg-[#18181b]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#737373]">
              No matching results found for &quot;{query}&quot;.
            </div>
          ) : (
            categories.map((cat) => {
              const catItems = filteredItems.filter((i) => i.category === cat);
              return (
                <div key={cat} className="mb-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                    {cat}
                  </div>
                  {catItems.map((item) => {
                    const index = globalIndexCounter++;
                    const isSelected = index === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          isSelected
                            ? "bg-[#f5f5f5] text-[#111111] dark:bg-[#18181b] dark:text-[#ffffff]"
                            : "text-[#3d3d3d] hover:bg-[#fafafa] dark:text-[#a1a1aa] dark:hover:bg-[#121215]"
                        }`}
                      >
                        <div className="flex flex-col pr-2">
                          <span className="font-medium text-[#111111] dark:text-[#f4f4f5]">
                            {item.title}
                          </span>
                          {item.subtitle ? (
                            <span className="text-xs text-[#737373] dark:text-[#71717a]">
                              {item.subtitle}
                            </span>
                          ) : null}
                        </div>

                        {item.badge ? (
                          <span className="flex-shrink-0 rounded border border-[#e5e5e5] bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-[#5c5c5c] dark:border-[#27272a] dark:bg-[#18181b] dark:text-[#a1a1aa]">
                            {item.badge}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[#e5e5e5] bg-[#fafafa] px-4 py-2 text-xs text-[#737373] dark:border-[#27272a] dark:bg-[#121215]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-mono">↵</kbd> to select
            </span>
          </div>
          <span>shovon.bd</span>
        </div>
      </div>
    </div>
  );
}
