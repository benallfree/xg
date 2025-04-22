import { faCheck, faCopy, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { VerifyResponse } from '../../server/types'

const Instructions = () => {
  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body prose max-w-none">
        <h2 className="card-title mb-4">How it Works</h2>
        <p className="text-base-content/80">
          To add your game, you need to implement Twitter Card meta tags on your game&apos;s page. The page must
          include:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:card</code>
            <span>Must be set to</span>
            <code className="px-2 py-1 bg-base-300 rounded">&quot;game&quot;</code>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:site</code>
            <span>Your X (Twitter) username</span>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:title</code>
            <span>The title of your game</span>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:description</code>
            <span>A brief description of your game</span>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:image</code>
            <span>An absolute URL to your game&apos;s preview image</span>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:player</code>
            <span>The URL where your game can be played</span>
          </li>
        </ul>
        <div className="divider"></div>
        <h3 className="font-semibold text-lg mb-2">CORS Requirements</h3>
        <p className="text-base-content/80">
          Your game and image URLs must have proper CORS headers to allow access from x.com:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span>Set</span>
            <code className="px-2 py-1 bg-base-300 rounded">Access-Control-Allow-Origin</code>
            <span>to either</span>
            <code className="px-2 py-1 bg-base-300 rounded">*</code>
            <span>or include</span>
            <code className="px-2 py-1 bg-base-300 rounded">x.com</code>
          </li>
          <li>Both the game URL and image URL must be publicly accessible</li>
          <li>URLs must use HTTPS for security</li>
        </ul>
        <div className="mt-4">
          <a
            href="https://gist.github.com/benallfree/4b690f3d0a529edf02fa9a1749d02e8a"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            View Example Implementation
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [response, setResponse] = useState<VerifyResponse | null>(null)

  const handleVerify = async () => {
    try {
      setStatus('loading')
      setResponse(null)

      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = (await res.json()) as VerifyResponse

      setResponse(data)
      setStatus(data.verified ? 'success' : 'error')
    } catch (err) {
      setStatus('error')
      setResponse({
        verified: false,
        error: err instanceof Error ? err.message : 'Failed to verify game',
        fields: undefined,
      })
    }
  }

  const handleReset = () => {
    setUrl('http://localhost:5173/')
    setStatus('idle')
    setResponse(null)
  }

  const makeCta = (title: string, url: string) =>
    `${title} is now playable on X Games! Install the @xgamesproj Chrome extension to enjoy ${title} and more games right in your X feed. ${url}`

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Add Your Game</h1>
      {!response?.verified && (
        <>
          <div className="card bg-base-100 shadow-lg mb-8">
            <div className="card-body">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg font-medium">Game URL</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://yourgame.com"
                    className="input input-bordered input-lg flex-1"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleVerify}
                    disabled={status === 'loading' || !url}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Verifying...
                      </>
                    ) : (
                      'Verify'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {response?.error && (
            <div className="alert alert-error mt-6 shadow-lg">
              <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
              <span>{response.error}</span>
            </div>
          )}
        </>
      )}

      {response?.fields && !response.verified && (
        <div className="card bg-base-100 shadow-lg mt-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Validation Results</h2>
            <div className="space-y-6">
              {Object.entries(response.fields).map(([field, validation]) => (
                <div key={field} className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      validation.status === 'ok' ? 'bg-success text-success-content' : 'bg-error text-error-content'
                    }`}
                  >
                    <FontAwesomeIcon icon={validation.status === 'ok' ? faCheck : faXmark} className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-medium">twitter:{field}</div>
                    <div className="text-base opacity-70 mt-1">{validation.value || '(not set)'}</div>
                    {validation.message && (
                      <div className="alert alert-error alert-sm mt-2 py-2">{validation.message}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!response?.verified && <Instructions />}

      {response?.verified && (
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
                  {makeCta(response.fields?.title.value || '', url)}
                </pre>
                <button
                  className="btn btn-primary btn-sm absolute top-4 right-4 gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    navigator.clipboard.writeText(makeCta(response.fields?.title.value || '', url))
                  }}
                >
                  <FontAwesomeIcon icon={faCopy} />
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button onClick={handleReset} className="btn btn-ghost btn-lg">
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
