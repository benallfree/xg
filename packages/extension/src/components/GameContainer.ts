import van from 'vanjs-core'
import { ApprovalStatus, type XGame } from '../types'
import { updateGamePreferences } from '../utils/storage'
import { GameCard } from './GameCard/GameCard'
import { GameEmbed } from './GameEmbed/GameEmbed'
import { SecurityPrompt } from './SecurityPrompt'

const { div, button, a } = van.tags

export const GameContainer = ({ xgame }: { xgame: XGame }) => {
  console.log(`GameContainer for ${xgame.meta.game}`, xgame)
  const isSecurityPromptOpen = van.state(false)
  const isPlaying = van.state(false)

  const onPlay = () => {
    console.log('onPlay', xgame.preferences.approvalStatus)
    if (xgame.preferences.approvalStatus === 'ask') {
      isSecurityPromptOpen.val = true
    } else {
      isPlaying.val = true
    }
  }

  const container = div(
    {
      style: () => `
      margin-top: 10px;
      margin-bottom: 10px;
      border-radius: 12px;
      background: #1a1b26;
      color: #e5e7eb;
      border: 1px solid #374151;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
      position: relative;
    `,
    },
    () => {
      console.log('isSecurityPromptOpen', isSecurityPromptOpen.val)
      if (!isSecurityPromptOpen.val) return div()
      return SecurityPrompt({
        xgame,
        onPlay: () => {
          isPlaying.val = true
          isSecurityPromptOpen.val = false
        },
        onAlwaysPlay: () => {
          updateGamePreferences(xgame.meta.game || '', { approvalStatus: ApprovalStatus.Ask })
          isPlaying.val = true
          isSecurityPromptOpen.val = false
        },
        onCancel: () => {
          isSecurityPromptOpen.val = false
        },
      })
    },
    () => {
      if (!isPlaying.val) {
        return GameCard({ xgame, onPlay })
      }
      return GameEmbed({ xgame })
    }
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // console.log('out of view, isPlaying.val', isPlaying.val)
          isPlaying.val = false
        }
      })
    },
    { threshold: 0.1 }
  )

  observer.observe(container)

  return container
}
