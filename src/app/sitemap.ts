import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/coaching", priority: 0.9 },
  { path: "/online-coaching", priority: 0.9 },
  { path: "/transformations", priority: 0.8 },
  { path: "/about", priority: 0.8 },
  { path: "/nutrition", priority: 0.7 },
  { path: "/recovery", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
