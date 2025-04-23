import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { VerifyResponse } from '../../server/types'

interface ValidationResultsProps {
  fields: NonNullable<VerifyResponse['fields']>
}

export const ValidationResults = ({ fields }: ValidationResultsProps) => {
  return (
    <div className="card bg-base-100 shadow-lg mt-8">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">Validation Results</h2>
        <div className="space-y-6">
          {Object.entries(fields).map(([field, validation]) => (
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
                {validation.message && <div className="alert alert-error alert-sm mt-2 py-2">{validation.message}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
