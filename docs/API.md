# Contribution CMS — REST API

Base URL: `NEXT_PUBLIC_WP_API` (e.g. `https://wordpress.contributionmagazine.com/wp-json`).
All endpoints below are public `GET` endpoints. Served by the **Contribution CMS** WordPress plugin (v6.4.2+).

> The frontend appends a `_cb=<timestamp>` cache-buster to every request (see `lib/wp-client.ts`). It is ignored by WordPress.

---

## Content endpoints

| Content    | List (all items, no body) | Single by ID         | Single by slug           |
| ---------- | ------------------------- | -------------------- | ------------------------ |
| Stories    | `GET /wp/v2/stories`      | `GET /wp/v2/stories/{id}`    | `GET /wp/v2/stories/{slug}`    |
| Interviews | `GET /wp/v2/interviews`   | `GET /wp/v2/interviews/{id}` | `GET /wp/v2/interviews/{slug}` |
| Magazines  | `GET /wp/v2/magazines`    | `GET /wp/v2/magazines/{id}`  | `GET /wp/v2/magazines/{slug}`  |

### List endpoints return **all** items

Previously WordPress's default `per_page=10` (max 100) meant only 10 items were returned. The plugin now sets
`per_page` default **and** maximum to `10000`, so a plain list request returns everything.

- `per_page` / `page` still work if you want to paginate; `X-WP-Total` and `X-WP-TotalPages` headers are accurate.
- Do **not** send `per_page=-1` — WordPress rejects it (`rest_post_invalid_page_number`).
- Supports the usual `_embed=1`, `_fields=`, `search`, `orderby`, `order` parameters.

### Body content is only on single-item endpoints

| Field          | List response | `/{id}` and `/{slug}` response |
| -------------- | :-----------: | :----------------------------: |
| `content`      | omitted       | ✅ `{ rendered, protected }`   |
| `content_html` | omitted       | ✅ (stories, interviews)       |
| every other field | ✅         | ✅                             |

### Slug endpoints

`/wp/v2/{stories|interviews|magazines}/{slug}` returns the same object as `/{id}`.

- Returns `404` (`rest_post_invalid_slug`) if no item has that slug.
- A slug made **only of digits** is treated as an ID.
- Drafts are returned only to authenticated users who can edit the item (same rule as `/{id}`).
- `_embed=1` and `context` are supported.

---

## Response fields

Standard WordPress fields (`id`, `slug`, `date`, `date_gmt`, `link`, `title`, `status`, `featured_media`, …) plus:

### Story
| Field              | Type              | Notes |
| ------------------ | ----------------- | ----- |
| `header_image_url` | string            | Full-size featured image, `""` if none |
| `subtitle`         | string            | |
| `description`      | string            | Short summary / dek |
| `read_time`        | number            | Minutes |
| `featured`         | boolean           | |
| `credits`          | `{role, name}[]`  | |
| `category`         | string \| null    | First category name |
| `is_draft`         | boolean           | |
| `content_html`     | string            | **Single only** |

### Interview
| Field              | Type             | Notes |
| ------------------ | ---------------- | ----- |
| `header_image_url` | string           | |
| `subject_name`     | string           | |
| `kicker`           | string           | Role / tagline |
| `pull_quote`       | string           | |
| `description`      | string           | |
| `credits`          | `{role, name}[]` | |
| `featured`         | boolean          | |
| `is_draft`         | boolean          | |
| `content_html`     | string           | **Single only** |

### Magazine issue
| Field                                          | Type       | Notes |
| ---------------------------------------------- | ---------- | ----- |
| `cover_image_url`                              | string     | |
| `video_url`                                    | string     | |
| `issue_number`                                 | string     | |
| `price_digital`, `price_print`                 | number     | |
| `stripe_buy_link_digital`, `stripe_buy_link_print` | string | |
| `sold_out`                                     | boolean    | |
| `release_date`                                 | string     | |
| `featured_artists`                             | string[]   | |
| `secondary_images`                             | string[]   | |
| `is_draft`                                     | boolean    | |

---

## Other endpoints (`/contribution/v1`)

| Endpoint                             | Returns |
| ------------------------------------ | ------- |
| `GET /contribution/v1/hero`          | `hero_image_url_desktop`, `hero_image_url_mobile`, `featured_story` |
| `GET /contribution/v1/featured`      | Latest story flagged `featured` (`404` if none) |
| `GET /contribution/v1/about`         | `content_html`, `description`, `email`, `instagram` |
| `GET /contribution/v1/privacy-policy`    | `content_html`, `description` |
| `GET /contribution/v1/terms-conditions`  | `content_html`, `description` |

---

## Examples

```bash
# All stories (no body)
curl "$WP/wp/v2/stories?_embed=1"

# One story with full body
curl "$WP/wp/v2/stories/the-art-of-starting-over?_embed=1"
curl "$WP/wp/v2/stories/42?_embed=1"
```

## Frontend usage (`hooks/use-content-query.ts`)

| Hook                              | Request                        | Has body? |
| --------------------------------- | ------------------------------ | :-------: |
| `useStories()` / `useInterviews()` / `useMagazines()` | list endpoints | no |
| `useStory(slug)` / `useInterview(slug)` / `useMagazine(slug)` | `/{slug}` endpoints | yes |

Detail pages fetch by slug (React Query keys `["stories", slug]`, etc.) instead of searching the list. A `404` is not
retried. Set `NEXT_PUBLIC_USE_MOCKS=false` to use the live API.

## Caching

If the WordPress host or a CDN caches REST responses, purge the cache after deploying the plugin update, otherwise
the old 10-item responses may keep being served.
