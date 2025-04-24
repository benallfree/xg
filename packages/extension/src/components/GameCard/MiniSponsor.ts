import van from 'vanjs-core'
import type { Sponsor } from '../../../../site/server/sponsors'
import { getSponsor } from '../../api'
import type { XGame } from '../../types'

const { div, a } = van.tags

export const MiniSponsor = ({ xgame }: { xgame: XGame }) => {
  const sponsor = van.state<Sponsor | null>(null)
  getSponsor().then((sp) => (sponsor.val = sp))

  return div(
    {
      style: `
      font-size: 14px;
      color: #6b7280;
    `,
    },
    `❤️ `,
    () => {
      if (!sponsor.val) return div()
      return a(
        {
          href: `https://x.com/${sponsor.val.name}`,
          target: '_blank',
          style: 'color: #60a5fa; text-decoration: none; &:hover { text-decoration: underline; }',
        },
        `@${sponsor.val.name}`
      )
    }
  )
}
