export const strapiUrl = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "").replace(/\/$/, "");
export const strapiToken = process.env.STRAPI_API_TOKEN || "";

export const hasStrapiConfig = Boolean(strapiUrl);
