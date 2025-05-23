import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { VerifyResponse } from '../../server/types'

interface SuccessMessageProps {
  fields: NonNullable<VerifyResponse['fields']>
  url: string
  onReset: () => void
}

export const SuccessMessage = ({ fields, url, onReset }: SuccessMessageProps) => {
  const [copied, setCopied] = useState(false)
  const makeCta = (title: string, url: string) =>
    `Play ${title} with me! Install the @xgamesproj Chrome extension to play right here in the post.\n\nLeave a comment with your high score ${url}`

  return (
    <div className="mt-8 space-y-6">
      <div className="alert alert-success shadow-lg">
        <FontAwesomeIcon icon={faCheck} className="w-6 h-6" />
        <span className="text-lg">All validations passed! Your game is ready to be announced.</span>
      </div>

      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-4">Share Your Game</h3>
          <p className="text-base-content/80 mb-4">Copy and paste this message to announce your game:</p>
          <div className="bg-base-100 p-6 rounded-lg relative group">
            <pre className="whitespace-pre-wrap font-normal text-lg break-words">
              {makeCta(fields?.title.value || '', url)}
            </pre>
            <button
              className="btn btn-primary btn-sm absolute top-4 right-4 gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => {
                navigator.clipboard.writeText(makeCta(fields?.title.value || '', url))
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            >
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button onClick={onReset} className="btn btn-ghost btn-lg">
          Start Over
        </button>
      </div>
    </div>
  )
}
