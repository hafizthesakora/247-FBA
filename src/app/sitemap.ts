import type { MetadataRoute } from "next";

const BASE_URL = "https://247fba.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/services/fba-prep",
    "/services/direct-injection",
    "/services/volume-prep",
    "/services/returns",
    "/services/storage",
    "/services/fulfillment",
    "/pricing",
    "/how-it-works",
    "/about",
    "/contact",
    "/ghana-line",
    "/impressum",
    "/datenschutz",
    "/agb",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services/") ? 0.7 : 0.8,
  }));
}
