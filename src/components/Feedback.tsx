import type { ValidationResult } from '../types'

type FeedbackProps = {
  feedback: ValidationResult | null
}

export function Feedback({ feedback }: FeedbackProps) {
  if (!feedback) {
    return (
      <div className="feedback neutral">
        Selecione ou arraste valores para os nos, depois valide a propriedade de heap.
      </div>
    )
  }

  return (
    <div className={`feedback ${feedback.isValid ? 'success' : 'error'}`}>
      <strong>{feedback.isValid ? 'Correto' : 'Incorreto'}</strong>
      <span>{feedback.message}</span>
      {feedback.issues.length > 1 && <small>Ha {feedback.issues.length} relacoes pai-filho para revisar.</small>}
    </div>
  )
}
