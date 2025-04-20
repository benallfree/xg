/// <reference path="../worker-configuration.d.ts" />

export default {
  async fetch(request, env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/')) {
      // TODO: Add your custom /api/* logic here.
      return new Response('Ok')
    }
    // Passes the incoming request through to the assets binding.
    // No asset matched this request, so this will evaluate `not_found_handling` behavior.
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
