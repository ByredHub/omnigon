import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const SITE_URL = "https://omnigon.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${SITE_URL}/${l}`]),
        ["x-default", `${SITE_URL}/en`],
      ]),
    },
  }));
}
