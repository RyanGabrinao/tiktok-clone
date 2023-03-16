import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "a007ao9u",
  dataset: "production",
  apiVersion: "2023-03-11",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
