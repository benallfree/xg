import van from 'vanjs-core'
import type { Sponsor as SponsorType } from '../../../../site/server/sponsors'
import { getSponsor } from '../../api'

const { div, a, iframe } = van.tags

export const Sponsor = () => {
  const sponsor = van.state<SponsorType | null>(null)
  getSponsor().then((sp) => (sponsor.val = sp))

  return div(() => {
    if (!sponsor.val) return div()
    return div(
      `Sponsored by ❤️ `,
      a(
        {
          href: `https://x.com/${sponsor.val?.name}`,
          target: '_blank',
          style: 'color: #1d9bf0',
        },
        `@${sponsor.val?.name}`
      ),
      ` - `,
      sponsor.val?.tagline
    )
  })
}
