import { DurableObject } from 'cloudflare:workers'
import { sponsors } from './sponsors'
import { GameRecord } from './types'
import { handleVerify } from './verify'

export class XGamesDo extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    // Required, as we're extending the base class.
    super(ctx, env)
  }

  async getNextSponsor(request: Request) {
    if (request.method === 'POST') {
      const body = await request.json<{ url: string }>()
      if (!body.url) {
        return { error: 'url is required' }
      }
      this.hit(body.url)
    }
    const currentSponsorIndex = (await this.ctx.storage.get<number>('currentSponsorIndex')) || 0
    const sponsor = sponsors[currentSponsorIndex]
    await this.ctx.storage.put('currentSponsorIndex', (currentSponsorIndex + 1) % sponsors.length)
    return sponsor
  }

  async hit(url: string) {
    return handleVerify(url, this.ctx)
  }

  async verify(url: string) {
    const res = await handleVerify(url, this.ctx, true)
    return res
  }

  async feature(url: string) {
    const key = `verify:${url}`
    const game = await this.ctx.storage.get<GameRecord>(key)
    if (!game) {
      return { error: 'Game not found' }
    }
    game.featuredAt = Date.now()
    await this.ctx.storage.put(key, game)
    return game
  }

  async getAllGames() {
    const games: GameRecord[] = []
    const result = await this.ctx.storage.list<GameRecord>({ prefix: 'verify:' })
    console.log('getAllGames', result.size)
    for (const [key, value] of result) {
      games.push(value)
    }
    return games
  }
}
