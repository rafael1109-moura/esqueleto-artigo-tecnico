import { useState } from 'react'
import type { FormEvent } from 'react'
import type { PriorityQueueItem, PriorityQueueMode } from '../../types'
import {
  createPriorityQueueItem,
  getHighestPriorityItem,
  insertByMode,
  normalizeQueueForMode,
  removeHighestPriorityByMode,
} from '../../utils/priorityQueueUtils'

type QueueMessage = {
  tone: 'neutral' | 'success' | 'error'
  text: string
}

const initialItems: PriorityQueueItem[] = [
  { id: 'priority-example-1', value: 'Fazer atividade', priority: 3 },
  { id: 'priority-example-2', value: 'Estudar prova', priority: 5 },
  { id: 'priority-example-3', value: 'Responder e-mail', priority: 1 },
  { id: 'priority-example-4', value: 'Revisar código', priority: 4 },
]

function getModeDescription(mode: PriorityQueueMode) {
  if (mode === 'ordered') {
    return 'Inserção reorganiza a lista por prioridade. Remoção sai direto do primeiro item.'
  }

  return 'Inserção vai para o final. Remoção percorre a lista para buscar a maior prioridade.'
}

function parsePriorityInput(priority: string) {
  const numericPriority = Number(priority)

  if (!Number.isFinite(numericPriority) || numericPriority < 0) {
    return null
  }

  return numericPriority
}

function getPriorityItemClass(item: PriorityQueueItem, highestPriorityItem: PriorityQueueItem | null) {
  const classes = ['priority-item']

  if (item.id === highestPriorityItem?.id) {
    classes.push('highest')
  } else if (item.priority >= 4) {
    classes.push('high')
  }

  return classes.join(' ')
}

export function PriorityQueue() {
  const [mode, setMode] = useState<PriorityQueueMode>('unordered')
  const [queue, setQueue] = useState<PriorityQueueItem[]>(initialItems)
  const [value, setValue] = useState('')
  const [priority, setPriority] = useState('1')
  const [message, setMessage] = useState<QueueMessage>({
    tone: 'neutral',
    text: 'Insira itens e remova sempre o elemento com maior prioridade.',
  })

  const highestPriorityItem = getHighestPriorityItem(queue)
  const modeDescription = getModeDescription(mode)

  function handleModeChange(nextMode: PriorityQueueMode) {
    setMode(nextMode)
    setQueue((currentQueue) => normalizeQueueForMode(currentQueue, nextMode))
    setMessage({
      tone: 'neutral',
      text:
        nextMode === 'ordered'
          ? 'Modo ordenado ativo: a maior prioridade fica no início.'
          : 'Modo não ordenado ativo: novos itens entram no final e a remoção faz busca.',
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedValue = value.trim()
    const numericPriority = parsePriorityInput(priority)

    if (!trimmedValue) {
      setMessage({ tone: 'error', text: 'Informe um valor para inserir na lista.' })
      return
    }

    if (numericPriority === null) {
      setMessage({ tone: 'error', text: 'Informe uma prioridade numérica maior ou igual a zero.' })
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
          ? `${item.value} entrou e a lista foi reorganizada por prioridade.`
          : `${item.value} entrou no final da lista não ordenada.`,
    })
  }

  function handleRemoveHighestPriority() {
    const result = removeHighestPriorityByMode(queue, mode)

    if (!result.removedItem) {
      setMessage({ tone: 'neutral', text: 'A lista esta vazia. Insira um item para continuar.' })
      return
    }

    setQueue(result.nextQueue)
    setMessage({
      tone: 'success',
      text:
        mode === 'ordered'
          ? `${result.removedItem.value} foi removido diretamente do início.`
          : `${result.removedItem.value} foi removido após comparar ${result.inspectedCount} itens.`,
    })
  }

  return (
    <section className="priority-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Lista de prioridade</p>
          <h2>Compare inserção e remoção por prioridade</h2>
          <p className="section-note">
            Números maiores representam prioridades maiores. Observe como o custo da operação muda em cada modo.
          </p>
        </div>
        <span className="mode-chip">{mode === 'ordered' ? 'Ordenada' : 'Nao ordenada'}</span>
      </div>

      <div className="priority-layout">
        <form className="priority-form" onSubmit={handleSubmit}>
          <label>
            Valor
            <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Ex.: Entregar resumo" />
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
              Não ordenada
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
          <div className="operation-summary">
            <span>{mode === 'ordered' ? 'Inserção: ordena' : 'Inserção: final'}</span>
            <span>{mode === 'ordered' ? 'Remoção: início' : 'Remoção: busca'}</span>
          </div>
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
            <article className={getPriorityItemClass(item, highestPriorityItem)} key={item.id}>
              <span className="priority-index">{index + 1}</span>
              <strong>{item.value}</strong>
              <small>prioridade {item.priority}</small>
              {item.id === highestPriorityItem?.id && <span className="priority-badge">maior prioridade</span>}
            </article>
          ))
        )}
      </div>

      <div className={`feedback ${message.tone}`}>{message.text}</div>
    </section>
  )
}
