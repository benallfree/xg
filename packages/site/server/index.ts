/// <reference path="../worker-configuration.d.ts" />

import { sponsors } from './sponsors'
import { handleVerify } from './verify'

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

let currentSponsorIndex = 0

export default {
  async fetch(request, env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: { ...corsHeaders, ...noCacheHeaders },
      })
    }

    const url = new URL(request.url)

    if (url.pathname === '/api/verify' && request.method === 'POST') {
      return handleVerify(request)
    }

    if (url.pathname === '/api/sponsor') {
      const sponsor = sponsors[currentSponsorIndex]
      currentSponsorIndex = (currentSponsorIndex + 1) % sponsors.length

      return new Response(JSON.stringify(sponsor), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
          ...noCacheHeaders,
        },
      })
    }

    if (url.pathname.startsWith('/api/ping')) {
      // TODO: Add your custom /api/* logic here.
      return new Response('Ok', {
        headers: corsHeaders,
      })
    }

    console.log(`got here`)
    // Passes the incoming request through to the assets binding.
    // No asset matched this request, so this will evaluate `not_found_handling` behavior.
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
