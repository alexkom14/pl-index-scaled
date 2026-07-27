import { Router } from 'express'
import { cacheMiddleware } from '../middleware/cache.js'
import { getTopScorers } from '../footballService.js'

const router = Router()

// GET /api/scorers
router.get('/', cacheMiddleware(300), async (req, res, next) => {
  try {
    const scorers = await getTopScorers()
    res.json(scorers)
  } catch (err) {
    next(err)
  }
})

export default router
