import { Redis } from '@upstash/redis'

export const dynamic = 'force-dynamic'

/** A set of anonymous visitor ids; its size is the number of unique visitors. */
const KEY = 'qbox:unique-visitors'

const VISITOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Vercel's Redis (Upstash, added from the Storage tab) injects `KV_REST_API_*`;
 * a store connected with a custom prefix or straight from Upstash uses
 * `UPSTASH_REDIS_REST_*`. Accept either. Null when neither is set, e.g. locally.
 */
const getRedis = (): Redis | null => {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN

  return url && token ? new Redis({ url, token }) : null
}

const respond = (body: { total?: number; error?: string }, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

/** The current number of unique visitors, without counting anyone. */
export const GET = async () => {
  const redis = getRedis()
  if (!redis) return respond({ error: 'Counter storage is not configured.' }, 503)

  return respond({ total: await redis.scard(KEY) })
}

/**
 * Registers the visitor id from the body and returns the new total. SADD is
 * atomic and idempotent, so a returning visitor, or two tabs at once, count once.
 */
export const POST = async (request: Request) => {
  const redis = getRedis()
  if (!redis) return respond({ error: 'Counter storage is not configured.' }, 503)

  const body = (await request.json().catch(() => null)) as { id?: unknown } | null
  const id = body?.id

  // Only well-formed v4 uuids go in, so the set cannot be stuffed with arbitrary strings.
  if (typeof id !== 'string' || !VISITOR_ID.test(id)) {
    return respond({ error: 'Invalid visitor id.' }, 400)
  }

  await redis.sadd(KEY, id.toLowerCase())

  return respond({ total: await redis.scard(KEY) })
}
