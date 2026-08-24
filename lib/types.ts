export interface WPTitle {
  rendered: string;
}
export interface WPContent {
  rendered: string;
  protected: boolean;
}

export interface WPBase {
  id: number;
  slug: string;
  date: string;
  date_gmt: string;
  link: string;
  title: WPTitle;
  content: WPContent;
  status: string;
}
export interface Credit {
  role: string;
  name: string;
}

export interface Story extends WPBase {
  header_image_url: string;
  subtitle: string;
  description: string;
  read_time: number;
  featured: boolean;
  credits: Credit[];
  category: string | null;
  content_html: string;
}
export interface Interview extends WPBase {
  header_image_url: string;
  subject_name: string;
  kicker: string;
  pull_quote: string;
  description: string;
  credits: Credit[];
  featured: boolean;
  content_html: string;
}
export interface MagazineIssue extends WPBase {
  cover_image_url: string;
  issue_number: string;
  price_digital: number;
  price_print: number;
  stripe_buy_link_digital: string;
  stripe_buy_link_print: string;
  sold_out: boolean;
  release_date: string;
  featured_artists: string[];
}

export interface FeaturedStory {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  header_image_url: string;
  category: string | null;
  read_time: number;
}
export interface AboutContent {
  content_html: string;
  description: string;
  email: string;
  instagram: string;
  social_links?: Record<string, string>;
  contact?: string;
}
export interface LegalPageContent {
  content_html: string;
  description: string;
}
export type PrivacyPolicyContent = LegalPageContent;
export type TermsConditionsContent = LegalPageContent;
export interface WPListParams {
  page?: number;
  per_page?: number;
  search?: string;
  orderby?: "date" | "title" | "id";
  order?: "asc" | "desc";
}
export interface SiteContact {
  email?: string;
  instagram?: string;
  social_links?: Record<string, string>;
  contact?: string;
}
