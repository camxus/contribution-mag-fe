import axios from 'axios'

export const wpClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_WP_API || 'https://your-wordpress-site.com/wp-json').replace(/\/$/, ''),
  headers: { Accept: 'application/json' },
  timeout: 10_000,
})

export async function getWp<T>(path: string) {
  const response = await wpClient.get<T>(path)
  return response.data
}
