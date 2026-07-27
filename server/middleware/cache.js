import NodeCache from 'node-cache'

const cache = new NodeCache()

// factory: pass ttl in seconds
export function cacheMiddleware(ttl = 300) {
  return (req, res, next) => {
    const key = req.originalUrl

    const cached = cache.get(key)
    if (cached) {
      console.log(`[cache] HIT ${key}`)
      return res.json(cached)
    }

    // monkey-patch res.json to store the response in cache before sending
    const originalJson = res.json.bind(res)
    res.json = (data) => {
      if (res.statusCode === 200) {
        cache.set(key, data, ttl)
        console.log(`[cache] SET ${key} (ttl: ${ttl}s)`)
      }
      return originalJson(data)
    }

    next()
  }
}
