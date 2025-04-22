/// <reference path="../worker-configuration.d.ts" />

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
}

export { XGamesDo } from './XGamesDo'

export default {
  async fetch(request, env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: { ...corsHeaders, ...noCacheHeaders },
      })
    }
    let id = env.XGAMES_DO.idFromName(`xgames`)
    let stub = env.XGAMES_DO.get(id)

    const url = new URL(request.url)

    if (url.pathname === '/api/verify' && request.method === 'POST') {
      const body = await request.json<{ url: string }>()
      if (!body.url) {
        return Response.json({ error: 'url is required' }, { status: 400 })
      }
      const result = await stub.verify(body.url)

      return Response.json(result, {
        headers: {
          ...corsHeaders,
          ...noCacheHeaders,
        },
      })
    }

    if (url.pathname === '/api/sponsor') {
      const sponsor = await stub.getNextSponsor(request)

      return Response.json(sponsor, {
        headers: {
          ...corsHeaders,
          ...noCacheHeaders,
        },
      })
    }

    if (url.pathname === '/api/games') {
      const games = await stub.getAllGames()
      return Response.json(games, {
        headers: {
          ...corsHeaders,
          ...noCacheHeaders,
        },
      })
    }

    if (url.pathname === '/api/hit') {
      const body = await request.json<{ url: string }>()
      if (!body.url) {
        return Response.json({ error: 'url is required' }, { status: 400 })
      }
      await stub.hit(body.url)
      return Response.json({ status: 'hit' }, { status: 200 })
    }

    if (url.pathname.startsWith('/api/ping')) {
      // TODO: Add your custom /api/* logic here.
      return Response.json(
        { status: 'healthy' },
        {
          headers: {
            ...corsHeaders,
            ...noCacheHeaders,
          },
        }
      )
    }

    // Passes the incoming request through to the assets binding.
    // No asset matched this request, so this will evaluate `not_found_handling` behavior.
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
