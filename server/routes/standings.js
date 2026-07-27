import { Router } from 'express'
import { cacheMiddleware } from '../middleware/cache.js'
import { getStandings } from '../footballService.js'

const router = Router()

// GET /api/standings
router.get('/', cacheMiddleware(300), async (req, res, next) => {
  try {
    const standings = await getStandings()
    res.json(standings)
  } catch (err) {
    next(err)
  }
})

export default router
