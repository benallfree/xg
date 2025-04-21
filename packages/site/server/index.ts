/// <reference path="../worker-configuration.d.ts" />

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default {
  async fetch(request, env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      })
    }

    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/ping')) {
      // TODO: Add your custom /api/* logic here.
      return new Response('Ok', {
        headers: corsHeaders,
      })
    }
    // Passes the incoming request through to the assets binding.
    // No asset matched this request, so this will evaluate `not_found_handling` behavior.
    const response = await env.ASSETS.fetch(request)

    // Clone the response to add CORS headers
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers),
        ...corsHeaders,
      },
    })
  },
} satisfies ExportedHandler<Env>
