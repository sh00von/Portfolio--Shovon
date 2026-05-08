"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { hasSanityConfig } from "@/sanity/env";

export function Studio() {
  if (!hasSanityConfig) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#171717] px-6 text-[#EDEDED]">
        <div className="max-w-lg border-y border-[#333] py-10">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight">Sanity is not connected</h1>
          <p className="mb-5 leading-relaxed text-[#a1a1a1]">
            Add your Sanity project environment variables in Vercel, then redeploy the site.
          </p>
          <pre className="overflow-x-auto rounded border border-[#333] bg-[#1a1a1a] p-4 text-sm text-[#d4d4d4]">
            NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id{"\n"}
            NEXT_PUBLIC_SANITY_DATASET=production
          </pre>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
