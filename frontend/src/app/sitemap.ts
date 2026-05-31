import type { MetadataRoute } from "next";

const ROUTES = [
  "",
  "/tools",
  "/tools/pdf",
  "/tools/image",
  "/tools/developer",
  "/tools/developer/json",
  "/tools/developer/base64",
  "/tools/developer/markdown",
  "/pdf-to-docx",
  "/docx-to-pdf",
  "/merge-pdf",
  "/split-pdf",
  "/compress-pdf",
  "/pdf-to-jpg",
  "/jpg-to-pdf",
  "/png-to-jpg",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gathordocs.com";
  return ROUTES.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
