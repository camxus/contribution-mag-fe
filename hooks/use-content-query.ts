"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getWp } from "@/lib/wp-client";
import {
  interviews,
  magazines,
  stories,
  type Interview,
  type Magazine,
  type Story,
} from "@/lib/content";

export const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";
type Rendered = string | { rendered?: string };
const text = (value: Rendered | undefined) =>
  typeof value === "string"
    ? value
    : value?.rendered?.replace(/<[^>]+>/g, "").trim() || "";
const media = (item: any) =>
  item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
  item?.cover_image_url ||
  item?.header_image_url ||
  "";

export function useStories() {
  return useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: async () =>
      useMocks
        ? stories
        : (await getWp<any[]>("/wp/v2/stories?_embed=1")).map((item) => ({
            slug: item.slug,
            title: text(item.title),
            dek: item.description || text(item.excerpt),
            category: item.category || "Culture",
            author: item.author || "Contribution Magazine",
            date: item.date || "",
            image: media(item),
            body: [text(item.content)],
          })),
  });
}
export function useInterviews() {
  return useQuery<Interview[]>({
    queryKey: ["interviews"],
    queryFn: async () =>
      useMocks
        ? interviews
        : (await getWp<any[]>("/wp/v2/interviews?_embed=1")).map((item) => ({
            slug: item.slug,
            name: item.subject_name || text(item.title),
            role: item.kicker || "Interview",
            image: media(item),
            quote: item.pull_quote || "",
            body: [text(item.content)],
          })),
  });
}
export function useMagazines() {
  return useQuery<Magazine[]>({
    queryKey: ["magazines"],
    queryFn: async () =>
      useMocks
        ? magazines
        : (await getWp<any[]>("/wp/v2/magazines?_embed=1")).map((item) => ({
            slug: item.slug,
            title: text(item.title),
            issue: item.issue_number
              ? `Issue ${item.issue_number}`
              : "Contribution Magazine",
            price: item.price_print
              ? `$${Number(item.price_print).toFixed(2)} USD`
              : "Available soon",
            image: media(item),
            description: text(item.content),
            stripeBuyLinkDigital: item.stripe_buy_link_digital,
            stripeBuyLinkPrint: item.stripe_buy_link_print,
            soldOut: item.sold_out,
          })),
  });
}
export function useFeatured() {
  return useQuery({
    queryKey: ["featured"],
    queryFn: () => getWp("/contribution/v1/featured"),
  });
}
export function useStory(slug: string) {
  const query = useStories();
  return {
    ...query,
    data: useMemo(
      () => query.data?.find((item) => item.slug === slug),
      [query.data, slug],
    ),
  };
}
export function useInterview(slug: string) {
  const query = useInterviews();
  return {
    ...query,
    data: useMemo(
      () => query.data?.find((item) => item.slug === slug),
      [query.data, slug],
    ),
  };
}
export function useMagazine(slug: string) {
  const query = useMagazines();
  return {
    ...query,
    data: useMemo(
      () => query.data?.find((item) => item.slug === slug),
      [query.data, slug],
    ),
  };
}
