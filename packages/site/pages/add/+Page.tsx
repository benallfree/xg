import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface FieldValidation {
  value: string | undefined
  status: 'ok' | 'error'
  message?: string
}

interface VerifyResponse {
  success: boolean
  error?: string
  fields?: {
    card: FieldValidation
    site: FieldValidation
    title: FieldValidation
    description: FieldValidation
    image: FieldValidation
    player: FieldValidation
  }
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
      setStatus(data.success ? 'success' : 'error')
    } catch (err) {
      setStatus('error')
      setResponse({
        success: false,
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

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold mb-6">Add Your Game</h1>

      {!response?.success && (
        <>
          <div className="prose mb-8">
            <h2>How it Works</h2>
            <p>
              To add your game, you need to implement Twitter Card meta tags on your game&apos;s page. The page must
              include:
            </p>
            <ul>
              <li>
                <code>twitter:card</code> - Must be set to <code>&quot;game&quot;</code>
              </li>
              <li>
                <code>twitter:site</code> - Your X (Twitter) username
              </li>
              <li>
                <code>twitter:title</code> - The title of your game
              </li>
              <li>
                <code>twitter:description</code> - A brief description of your game
              </li>
              <li>
                <code>twitter:image</code> - An absolute URL to your game&apos;s preview image
              </li>
              <li>
                <code>twitter:player</code> - The URL where your game can be played
              </li>
            </ul>
            <p>Additionally, your game and image URLs must have proper CORS headers to allow access from x.com:</p>
            <ul>
              <li>
                Set <code>Access-Control-Allow-Origin</code> to either <code>*</code> or include <code>x.com</code>
              </li>
              <li>Both the game URL and image URL must be publicly accessible</li>
              <li>URLs must use HTTPS for security</li>
            </ul>
            <p>
              See this{' '}
              <a
                href="https://gist.github.com/benallfree/4b690f3d0a529edf02fa9a1749d02e8a"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                example implementation
              </a>{' '}
              for reference.
            </p>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Game URL</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://yourgame.com"
                className="input input-bordered flex-1"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleVerify} disabled={status === 'loading' || !url}>
                {status === 'loading' ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        </>
      )}

      {response?.error && (
        <div className="alert alert-error mt-4">
          <span>{response.error}</span>
        </div>
      )}

      {response?.fields && !response.success && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Validation Results</h2>
          <div className="space-y-4">
            {Object.entries(response.fields).map(([field, validation]) => (
              <div key={field} className="flex items-start gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${validation.status === 'ok' ? 'bg-success text-success-content' : 'bg-error text-error-content'}`}
                >
                  <FontAwesomeIcon icon={validation.status === 'ok' ? faCheck : faXmark} className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">twitter:{field}</div>
                  <div className="text-sm opacity-70">{validation.value || '(not set)'}</div>
                  {validation.message && <div className="text-sm text-error mt-1">{validation.message}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {response?.success && (
        <div className="mt-8 space-y-4">
          <div className="alert alert-success">
            <span>All validations passed! Your game is ready to be announced.</span>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">Share Your Game</h3>
              <p className="text-sm mb-4">Copy and paste this message to announce your game:</p>
              <div className="bg-base-100 p-4 rounded-lg relative group">
                <pre className="whitespace-pre-wrap font-normal text-base break-words">
                  {`${response.fields?.title.value} is now playable on X Games! Install the @x64m35 Chrome extension to enjoy ${response.fields?.title.value} and more games right in your X feed. ${url}`}
                </pre>
                <button
                  className="btn btn-sm btn-ghost absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${response.fields?.title.value} is now playable on X Games! Install the @x64m35 Chrome extension to enjoy ${response.fields?.title.value} and more games right in your X feed. ${url}`
                    )
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button onClick={handleReset} className="btn btn-ghost">
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
