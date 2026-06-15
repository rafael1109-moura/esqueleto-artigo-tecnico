import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { PriorityQueueItem, PriorityQueueMode } from '../../types'
import {
  createPriorityQueueItem,
  insertByMode,
  removeHighestPriorityByMode,
} from '../../utils/priorityQueueUtils'

type QueueMessage = {
  tone: 'neutral' | 'success'
  text: string
}

const initialItems: PriorityQueueItem[] = [
  { id: 'priority-example-1', value: 'A', priority: 2 },
  { id: 'priority-example-2', value: 'B', priority: 5 },
  { id: 'priority-example-3', value: 'C', priority: 3 },
]

export function PriorityQueue() {
  const [mode, setMode] = useState<PriorityQueueMode>('unordered')
  const [queue, setQueue] = useState<PriorityQueueItem[]>(initialItems)
  const [value, setValue] = useState('')
  const [priority, setPriority] = useState('1')
  const [message, setMessage] = useState<QueueMessage>({
    tone: 'neutral',
    text: 'Insira itens e remova sempre o elemento com maior prioridade.',
  })

  const modeDescription = useMemo(() => {
    if (mode === 'ordered') {
      return 'Insercao reorganiza a lista por prioridade; remocao sai direto do inicio.'
    }

    return 'Insercao vai para o final; remocao percorre a lista para encontrar a maior prioridade.'
  }, [mode])

  function handleModeChange(nextMode: PriorityQueueMode) {
    setMode(nextMode)
    setQueue((currentQueue) => {
      // Ao trocar para ordenada, refletimos visualmente a regra do modo.
      if (nextMode === 'ordered') {
        return currentQueue.toSorted((firstItem, secondItem) => secondItem.priority - firstItem.priority)
      }

      return currentQueue
    })
    setMessage({ tone: 'neutral', text: nextMode === 'ordered' ? 'Modo ordenado ativo.' : 'Modo nao ordenado ativo.' })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedValue = value.trim()
    const numericPriority = Number(priority)

    if (!trimmedValue || Number.isNaN(numericPriority)) {
      setMessage({ tone: 'neutral', text: 'Informe um valor e uma prioridade numerica.' })
      return
    }

    const item = createPriorityQueueItem(trimmedValue, numericPriority)
    setQueue((currentQueue) => insertByMode(currentQueue, item, mode))
    setValue('')
    setPriority('1')
    setMessage({
      tone: 'success',
      text:
        mode === 'ordered'
          ? `Valor ${item.value} inserido mantendo a lista ordenada por prioridade.`
          : `Valor ${item.value} inserido no final da lista.`,
    })
  }

  function handleRemoveHighestPriority() {
    const result = removeHighestPriorityByMode(queue, mode)

    if (!result.removedItem) {
      setMessage({ tone: 'neutral', text: 'A lista esta vazia.' })
      return
    }

    setQueue(result.nextQueue)
    setMessage({
      tone: 'success',
      text:
        mode === 'ordered'
          ? `Removido ${result.removedItem.value} diretamente do inicio.`
          : `Removido ${result.removedItem.value} apos buscar entre ${result.inspectedCount} itens.`,
    })
  }

  return (
    <section className="priority-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Lista de prioridade</p>
          <h2>Compare insercao e remocao por prioridade</h2>
        </div>
        <span className="mode-chip">{mode === 'ordered' ? 'Ordenada' : 'Nao ordenada'}</span>
      </div>

      <div className="priority-layout">
        <form className="priority-form" onSubmit={handleSubmit}>
          <label>
            Valor
            <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Ex.: tarefa A" />
          </label>
          <label>
            Prioridade
            <input
              min="0"
              type="number"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              placeholder="Ex.: 5"
            />
          </label>
          <button className="primary-button" type="submit">
            Inserir
          </button>
        </form>

        <div className="tool-panel priority-controls">
          <h2>Modo da lista</h2>
          <div className="segmented-control" role="group" aria-label="Modo da lista de prioridade">
            <button
              className={mode === 'unordered' ? 'active' : ''}
              onClick={() => handleModeChange('unordered')}
              type="button"
            >
              Nao ordenada
            </button>
            <button
              className={mode === 'ordered' ? 'active' : ''}
              onClick={() => handleModeChange('ordered')}
              type="button"
            >
              Ordenada
            </button>
          </div>
          <p className="step-text">{modeDescription}</p>
          <button className="secondary-button" disabled={queue.length === 0} onClick={handleRemoveHighestPriority} type="button">
            Remover maior prioridade
          </button>
        </div>
      </div>

      <div className="priority-queue-view" aria-live="polite">
        {queue.length === 0 ? (
          <span className="empty-state">Nenhum item na lista.</span>
        ) : (
          queue.map((item, index) => (
            <article className="priority-item" key={item.id}>
              <span className="priority-index">{index + 1}</span>
              <strong>{item.value}</strong>
              <small>prioridade {item.priority}</small>
            </article>
          ))
        )}
      </div>

      <div className={`feedback ${message.tone}`}>{message.text}</div>
    </section>
  )
}
