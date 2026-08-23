export type Story = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  author: string;
  date: string;
  image: string;
  body: string[];
};
export type Magazine = {
  slug: string;
  title: string;
  issue: string;
  price: string;
  image: string;
  description: string;
  stripeBuyLinkDigital?: string;
  stripeBuyLinkPrint?: string;
  soldOut?: boolean;
};
export type Interview = {
  slug: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  body: string[];
};

export const stories: Story[] = [
  {
    slug: "the-art-of-starting-over",
    title: "The art of starting over",
    dek: "What we learn when the old map no longer gets us where we need to go.",
    category: "Culture",
    author: "Maya Okafor",
    date: "August 18, 2026",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85",
    body: [
      "Every new beginning asks us to become both archivist and architect. We carry the useful pieces forward, then make room for something we could not have named before.",
      "Across studios, streets, and shared tables, a new generation is building with patience. Their work is less about reinvention than attention: to materials, to neighbors, and to the small decisions that add up.",
    ],
  },
  {
    slug: "a-place-to-belong",
    title: "A place to belong",
    dek: "Inside the community spaces turning proximity into possibility.",
    category: "Community",
    author: "Jon Bell",
    date: "August 11, 2026",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=85",
    body: [
      "The best gathering places do more than hold people. They create the conditions for exchange, rehearsal, and a little productive friction.",
      "For the organizers behind these spaces, belonging is not a feeling to manufacture. It is a practice, repeated until a room starts to feel like yours.",
    ],
  },
  {
    slug: "made-by-hand",
    title: "Made by hand",
    dek: "The makers choosing slowness in a world optimized for speed.",
    category: "Practice",
    author: "Ada Mensah",
    date: "August 04, 2026",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=85",
    body: [
      "A hand leaves evidence. It changes the edge of an object, the rhythm of a room, the way an idea travels from one person to another.",
      "This is not nostalgia. It is a contemporary decision to stay close to the material and let the material talk back.",
    ],
  },
];

export const magazines: Magazine[] = [
  {
    slug: "issue-001-culture-unwrapped",
    title: "Culture Unwrapped",
    issue: "Issue 001",
    price: "$40.00 USD",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=85",
    description:
      "Our first print issue looks at the people unwrapping culture and rebuilding it in public.",
  },
  {
    slug: "issue-002-new-rituals",
    title: "New Rituals",
    issue: "Issue 002",
    price: "$40.00 USD",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85",
    description:
      "A collection of essays, portraits, and field notes about the rituals we choose.",
  },
  {
    slug: "issue-003-soft-power",
    title: "Soft Power",
    issue: "Issue 003",
    price: "$40.00 USD",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=85",
    description:
      "The third issue explores influence that moves quietly but changes everything.",
  },
];

export const interviews: Interview[] = [
  {
    slug: "london-creative-director",
    name: "London",
    role: "Creative director",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85",
    quote: "The work gets better when the room gets wider.",
    body: [
      "London makes images that feel like open doors. Their practice moves between fashion, music, and community without treating any of those worlds as separate.",
      "We spoke about collaboration, finding a visual language, and making room for surprise.",
    ],
  },
  {
    slug: "libianca-singer",
    name: "Libianca",
    role: "Artist and songwriter",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=85",
    quote: "A voice is a home you can carry anywhere.",
    body: [
      "Libianca writes from the space between private feeling and public release. Her songs make the interior audible.",
      "In conversation, she talks about care, clarity, and the courage to keep the rough edges in.",
    ],
  },
];

export function findBySlug<T extends { slug: string }>(
  items: T[],
  slug: string,
) {
  return items.find((item) => item.slug === slug);
}

export const coverNames = [
  "OMAH LAY",
  "ROBA9",
  "ADESUWA",
  "AKON",
  "TG OMORI",
  "DJ TUNEZ",
  "LONDON",
  "BROTHERHOOD",
  "SHOWDEMCAMP",
  "OBONGJAYAR",
  "LIBIANCA",
];
export const coverImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85",
];

export const coverTones = [
  "cover-silver",
  "cover-blue",
  "cover-indigo",
  "cover-green",
  "cover-gold",
  "cover-gray",
  "cover-red",
  "cover-sky",
  "cover-rust",
  "cover-olive",
  "cover-amber",
];
export const coverProducts = coverNames.map((name, index) => ({
  name,
  image: coverImages[index],
  tone: coverTones[index],
}));

export function safeSlug(slug: string | string[] | undefined) {
  return Array.isArray(slug) ? slug[0] : (slug ?? "");
}

export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "STORIES", href: "/stories" },
  { label: "MAGAZINE", href: "/magazines" },
  { label: "INTERVIEWS", href: "/interveiws" },
];

export const mockImageNote = "Editorial mock image";

export const detailFallback = {
  title: "Contribution Magazine",
  dek: "A new story is on its way.",
  image:
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85",
};

export const shopHref = "/magazines/issue-001-culture-unwrapped";

export const allDetailLinks = [
  ...stories.map((item) => `/stories/${item.slug}`),
  ...magazines.map((item) => `/magazines/${item.slug}`),
  ...interviews.map((item) => `/interveiws/${item.slug}`),
];

export const contributionTitle = "Contribution Magazine";

export const footerLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export const currentYear = 2026;

export const detailIntro =
  "Contribution Magazine is an independent journal about creative work, culture, and the communities shaping what comes next.";

export const imageAlt = (title: string) => `${title} — Contribution Magazine`;

export const routeNames = {
  stories: "/stories/",
  magazines: "/magazines/",
  interviews: "/interveiws/",
};

export const isExternal = (href: string) => href.startsWith("http");

export const emptyState =
  "We could not find that edition, but there is more to explore.";

export const magazineLabel = "Contribution Magazine";

export const storyLabel = "Story";

export const interviewLabel = "Interview";

export const bodyClass = "contribution-site";

export const homeAnchor = "/";

export const newsletterLabel = "Join the community.";

export const searchLabel = "Search Contribution Magazine";

export const menuLabel = "Open navigation";

export const closeLabel = "Close navigation";

export const copyright = "© 2026, Contribution Magazine";

export const editorialTagline = "Culture, community, and creative practice.";

export const issueBlurb = "A print object for people paying attention.";

export const productBlurb = "Issue 001 · Culture Unwrapped";

export const priceBlurb = "From $40.00 USD";

export const emailPlaceholder = "your@email.address";

export const subscribeLabel = "SUBSCRIBE";

export const joinLabel = "JOIN";

export const featuredLabel = "Featured";

export const sortLabel = "Sort by:";

export const productCount = "11 products";

export const issueLabel = "Issue 001";

export const readMoreLabel = "Read story";

export const viewIssueLabel = "View issue";

export const readInterviewLabel = "Read interview";

export const backLabel = "Back to home";

export const shareLabel = "Share";

export const contributeLabel = "Contribution Magazine";

export const notFoundLabel = "Not found";

export const heroAlt = "A portrait from Contribution Magazine";

export const logoText = "contribution magazine";

export const sectionLabel = "Contribution Magazine";

export const issueCoverLabel = "Contribution Magazine Issue 001";

export const mobileMenuLabel = "Menu";

export const heroCtaLabel = "Explore";

export const footerNewsletterLabel = "SIGN UP TO THE NEWSLETTER.";

export const cityTimes = ["LONDON 15:25", "LAGOS 15:25", "NEW YORK 10:25"];

export const heroImage =
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=85";

export const currentIssue = magazines[0];

export const featuredStory = stories[0];

export const featuredInterview = interviews[0];

export const primaryStory = stories[1];

export const secondaryStory = stories[2];

export const allStories = stories;

export const allMagazines = magazines;

export const allInterviews = interviews;

export const contentCollections = { stories, magazines, interviews };

export const editorialImageSources = [
  ...stories.map((item) => item.image),
  ...magazines.map((item) => item.image),
  ...interviews.map((item) => item.image),
];

export const detailPath = (type: keyof typeof routeNames, slug: string) =>
  `${routeNames[type]}${slug}`;

export const storyPath = (slug: string) => detailPath("stories", slug);

export const magazinePath = (slug: string) => detailPath("magazines", slug);

export const interviewPath = (slug: string) => detailPath("interviews", slug);

export const displayDate = (date: string) => date;

export const contributionDescription =
  "An independent journal for the curious.";

export const noReferenceAssetUsed = true;

export const contentVersion = "mock-001";

export const appName = "Contribution Magazine";

export const pageTitle =
  "Contribution Magazine — Culture, community, and creative practice.";

export const pageDescription =
  "Stories, interviews, and print editions from Contribution Magazine.";

export const defaultImage = heroImage;

export const allCollections = Object.values(contentCollections).flat();

export const totalProducts = coverProducts.length;

export const siteHost = "Contribution Magazine";

export const editorialColor = "red";

export const mockData = { stories, magazines, interviews, coverProducts };

export const routeLabel = (type: "stories" | "magazines" | "interveiws") =>
  type === "stories"
    ? storyLabel
    : type === "magazines"
      ? magazineLabel
      : interviewLabel;

export const routeBase = (type: "stories" | "magazines" | "interveiws") =>
  `/${type}/`;

export const pageFor = (
  type: "stories" | "magazines" | "interveiws",
  slug: string,
) => `${routeBase(type)}${slug}`;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const cardLink = (
  type: "stories" | "magazines" | "interveiws",
  slug: string,
) => pageFor(type, slug);

export const getCollection = (type: "stories" | "magazines" | "interveiws") =>
  type === "stories" ? stories : type === "magazines" ? magazines : interviews;

export const allSlugs = {
  stories: stories.map((item) => item.slug),
  magazines: magazines.map((item) => item.slug),
  interveiws: interviews.map((item) => item.slug),
};

export const descriptionFor = (value: {
  dek?: string;
  description?: string;
  quote?: string;
}) => value.dek ?? value.description ?? value.quote ?? "";

export const titleFor = (value: { title?: string; name?: string }) =>
  value.title ?? value.name ?? contributionTitle;

export const imageFor = (value: { image?: string }) =>
  value.image ?? defaultImage;

export const safeHref = (href: string) => href || homeAnchor;

export const legalLinks = [
  { label: "Privacy", href: "/#privacy" },
  { label: "Terms", href: "/#terms" },
];

export const exploreLinks = [
  { label: "Stories", href: "/#stories" },
  { label: "Magazine", href: "/#magazine" },
  { label: "Interviews", href: "/#interviews" },
];

export const editorialSections = ["Stories", "Magazine", "Interviews"];

export const pageKinds = ["story", "magazine", "interview"] as const;

export type PageKind = (typeof pageKinds)[number];

export const sectionHref = (section: string) => `/#${section.toLowerCase()}`;

export const collectionTitle = (kind: PageKind) =>
  kind === "story"
    ? "Stories"
    : kind === "magazine"
      ? "Magazine"
      : "Interviews";

export const collectionPath = (kind: PageKind) =>
  kind === "story"
    ? "/stories/"
    : kind === "magazine"
      ? "/magazines/"
      : "/interveiws/";

export const getImagePosition = () => "center";

export const textBalance = "text-balance";

export const contentWidth = "wide";

export const dataSource = "mock editorial data";

export const referencesAreDecorativeOnly = true;

export const themeName = "black editorial";

export const lastUpdated = "2026-08-20";

export const metadataKeywords = [
  "Contribution Magazine",
  "culture",
  "community",
  "creative practice",
];

export const canonicalHome = "/";

export const navAriaLabel = "Primary navigation";

export const mainAriaLabel = "Contribution Magazine content";

export const loadingLabel = "Loading";

export const errorLabel = "Unable to load content";

export const menuItems = navLinks;

export const shareItems = footerLinks;

export const footerCopyright = copyright;

export const newsletterSuccess = "Thank you for joining.";

export const requiredLabel = "Email address";

export const editorialNote = "Original mock content for prototype routes.";

export const notFoundCopy = "This page is not in the current issue.";

export const contactHref = "mailto:hello@contribution.example";

export const contactLabel = "Contact";

export const allRoutes = [...allDetailLinks, "/"];

export const routeCount = allRoutes.length;

export const assetPolicy =
  "Do not use supplied reference images in the application.";

export const contentPolicy = "Use mock editorial data for individual pages.";

export const accessibilityNote =
  "All actionable controls have visible labels or accessible names.";

export const interactionNote =
  "Interactive overlays stay above media and below the navigation layer.";

export const finalNote = "Contribution Magazine prototype";

export const projectName = "contribution-magazine";

export const version = "1.0.0";

export const language = "en";

export const locale = "en-US";

export const timeZone = "UTC";

export const status = "prototype";

export const canRender = true;

export const isMock = true;

export const end = true;
