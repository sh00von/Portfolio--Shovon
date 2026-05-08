export const apiVersion = "2026-05-08";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8427m7c1";

export const hasSanityConfig = Boolean(projectId && dataset);
