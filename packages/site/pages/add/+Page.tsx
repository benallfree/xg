import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { VerifyResponse } from '../../server/types'
import { CorsExamples } from './CorsExamples'
import { HowItWorks } from './HowItWorks'
import { MetaTagsExample } from './MetaTagsExample'
import { SuccessMessage } from './SuccessMessage'
import { ValidationResults } from './ValidationResults'

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

      {response?.fields && !response.verified && <ValidationResults fields={response.fields} />}

      {!response?.verified && (
        <div className="space-y-4">
          <HowItWorks />
          <MetaTagsExample />
          <CorsExamples />
        </div>
      )}

      {response?.verified && response.fields && (
        <SuccessMessage fields={response.fields} url={url} onReset={handleReset} />
      )}
    </div>
  )
}
