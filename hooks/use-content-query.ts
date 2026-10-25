"use client";

import { useQuery } from "@tanstack/react-query";
import { getWp } from "@/lib/wp-client";
import {
  interviews,
  magazines,
  stories,
  type Interview,
  type Magazine,
  type Story,
  heroImage,
  featuredStory,
} from "@/lib/content";
import { decode } from "he";

import type { AboutContent, LegalPageContent, SiteContact } from "@/lib/types";

export const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";
type Rendered = string | { rendered?: string };

const text = (value: Rendered | undefined) => {
  const raw =
    typeof value === "string"
      ? value
      : value?.rendered?.replace(/<[^>]+>/g, "").trim() || "";

  return decode(raw);
};
const media = (item: any) =>
  item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
  item?.cover_image_url ||
  item?.header_image_url ||
  "";

/* -------------------------------------------------------------------------- */
/* Mappers                                                                     */
/*                                                                             */
/* List endpoints (/wp/v2/{stories,interviews,magazines}) return ALL items but */
/* WITHOUT body content. `content` / `content_html` are only present on the    */
/* single-item endpoints (/{id} or /{slug}), so `body` is empty and            */
/* `content_html` is "" for items that come from a list response.              */
/* -------------------------------------------------------------------------- */

const mapStory = (item: any): Story => ({
  slug: item.slug,
  title: text(item.title),
  dek: item.description || text(item.excerpt),
  category: item.category || "Culture",
  author: item.author || "Contribution Magazine",
  date: item.date || "",
  image: media(item),
  body: item.content ? [text(item.content)] : [],
  content_html: item.content_html || "",
});

const mapInterview = (item: any): Interview => ({
  slug: item.slug,
  name: item.subject_name || text(item.title),
  role: item.kicker || "Interview",
  image: media(item),
  quote: item.pull_quote || "",
  body: item.content ? [text(item.content)] : [],
  content_html: item.content_html || "",
});

const mapMagazine = (item: any): Magazine => ({
  slug: item.slug,
  title: text(item.title),
  issue: item.issue_number
    ? `Issue ${item.issue_number}`
    : "Contribution Magazine",
  priceDigital: item.price_digital ? Number(item.price_digital) : 40,
  pricePrint: item.price_print ? Number(item.price_print) : 40,
  image: media(item),
  videoUrl: item.video_url,
  stripeBuyLinkDigital: item.stripe_buy_link_digital,
  stripeBuyLinkPrint: item.stripe_buy_link_print,
  soldOut: item.sold_out,
  releaseDate: item.release_date,
  featuredArtists: item.featured_artists,
  secondaryImages: item.secondary_images,
});

// Don't retry a missing slug (404); retry other failures up to twice.
const retryUnlessNotFound = (failureCount: number, error: any) =>
  error?.response?.status !== 404 && failureCount < 2;

/* -------------------------------------------------------------------------- */
/* Collections (all items, no body content)                                    */
/* -------------------------------------------------------------------------- */

export function useStories() {
  return useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: async () =>
      useMocks
        ? stories
        : (await getWp<any[]>("/wp/v2/stories?_embed=1")).map(mapStory),
  });
}
export function useInterviews() {
  return useQuery<Interview[]>({
    queryKey: ["interviews"],
    queryFn: async () =>
      useMocks
        ? interviews
        : (await getWp<any[]>("/wp/v2/interviews?_embed=1")).map(mapInterview),
  });
}
export function useMagazines() {
  return useQuery<Magazine[]>({
    queryKey: ["magazines"],
    queryFn: async () =>
      useMocks
        ? magazines
        : (await getWp<any[]>("/wp/v2/magazines?_embed=1")).map(mapMagazine),
  });
}
export type Hero = {
  hero_image_url_desktop: string;
  hero_image_url_mobile: string;
  featured_story: Story | null;
};

export function useHero() {
  return useQuery<Hero>({
    queryKey: ["hero"],
    queryFn: async () =>
      useMocks
        ? { hero_image_url_desktop: heroImage, hero_image_url_mobile: heroImage, featured_story: featuredStory }
        : getWp<Hero>("/contribution/v1/hero"),
  });
}

export function useFeatured() {
  return useQuery({
    queryKey: ["featured"],
    queryFn: () => getWp("/contribution/v1/featured"),
  });
}
export function useAbout() {
  return useQuery<AboutContent>({
    queryKey: ["about"],
    queryFn: () => getWp("/contribution/v1/about"),
  });
}
export function usePrivacyPolicy() {
  return useQuery<LegalPageContent>({
    queryKey: ["privacy-policy"],
    queryFn: () => getWp("/contribution/v1/privacy-policy"),
  });
}
export function useTermsConditions() {
  return useQuery<LegalPageContent>({
    queryKey: ["terms-conditions"],
    queryFn: () => getWp("/contribution/v1/terms-conditions"),
  });
}
export function useSiteContact() {
  const query = useAbout();
  return {
    ...query,
    data: query.data
      ? ({
        email: query.data.email,
        instagram: query.data.instagram,
        social_links: query.data.social_links,
        contact: query.data.contact,
      } satisfies SiteContact)
      : undefined,
  };
}
/* -------------------------------------------------------------------------- */
/* Single items (full content) — fetched by slug                               */
/* -------------------------------------------------------------------------- */

export function useStory(slug: string) {
  return useQuery<Story | undefined>({
    queryKey: ["stories", slug],
    enabled: !!slug,
    retry: retryUnlessNotFound,
    queryFn: async () =>
      useMocks
        ? stories.find((item) => item.slug === slug)
        : mapStory(
            await getWp<any>(
              `/wp/v2/stories/${encodeURIComponent(slug)}?_embed=1`,
            ),
          ),
  });
}
export function useInterview(slug: string) {
  return useQuery<Interview | undefined>({
    queryKey: ["interviews", slug],
    enabled: !!slug,
    retry: retryUnlessNotFound,
    queryFn: async () =>
      useMocks
        ? interviews.find((item) => item.slug === slug)
        : mapInterview(
            await getWp<any>(
              `/wp/v2/interviews/${encodeURIComponent(slug)}?_embed=1`,
            ),
          ),
  });
}
export function useMagazine(slug: string) {
  return useQuery<Magazine | undefined>({
    queryKey: ["magazines", slug],
    enabled: !!slug,
    retry: retryUnlessNotFound,
    queryFn: async () =>
      useMocks
        ? magazines.find((item) => item.slug === slug)
        : mapMagazine(
            await getWp<any>(
              `/wp/v2/magazines/${encodeURIComponent(slug)}?_embed=1`,
            ),
          ),
  });
}
