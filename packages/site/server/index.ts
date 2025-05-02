/// <reference path="../worker-configuration.d.ts" />

import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono<any>()
app.use('/*', cors())

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
}

// Middleware to add no-cache headers to all /api/* responses
app.use('/api/*', async (c, next) => {
  await next()
  Object.entries(noCacheHeaders).forEach(([k, v]) => {
    c.res.headers.set(k, v)
  })
})

export { XGamesDo } from './XGamesDo'

app.post('/api/verify', async (c) => {
  const env = c.env
  const body = await c.req.json<{ url: string }>()
  if (!body.url) {
    return c.json({ error: 'url is required' }, 400)
  }
  let id = env.XGAMES_DO.idFromName(`xgames`)
  let stub = env.XGAMES_DO.get(id)
  const result = await stub.verify(body.url)
  return c.json(result)
})

app.get('/api/sponsor', async (c) => {
  const env = c.env
  let id = env.XGAMES_DO.idFromName(`xgames`)
  let stub = env.XGAMES_DO.get(id)
  const sponsor = await stub.getNextSponsor(c.req)
  return c.json(sponsor)
})

app.get('/api/games', async (c) => {
  const env = c.env
  let id = env.XGAMES_DO.idFromName(`xgames`)
  let stub = env.XGAMES_DO.get(id)
  const games = await stub.getAllGames()
  return c.json(games)
})

app.get('/api/feature', async (c) => {
  const env = c.env
  const gameUrl = c.req.query('url')
  if (!gameUrl) {
    return c.json({ error: 'url parameter is required' }, 400)
  }
  let id = env.XGAMES_DO.idFromName(`xgames`)
  let stub = env.XGAMES_DO.get(id)
  const result = await stub.feature(gameUrl)
  return c.json(result)
})

app.post('/api/hit', async (c) => {
  const env = c.env
  const body = await c.req.json<{ url: string }>()
  if (!body.url) {
    return c.json({ error: 'url is required' }, 400)
  }
  let id = env.XGAMES_DO.idFromName(`xgames`)
  let stub = env.XGAMES_DO.get(id)
  await stub.hit(body.url)
  return c.json({ status: 'hit' })
})

app.get('/api/ping', (c) => {
  return c.json({ status: 'healthy' })
})

export default app
