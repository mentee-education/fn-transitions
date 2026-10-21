import { createClient } from "@sanity/client";

export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "gti1ywqi";
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: true,
});
