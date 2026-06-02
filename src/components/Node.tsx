import type { DragEvent } from 'react'
import type { HeapItem } from '../types'

type NodeProps = {
  index: number
  item: HeapItem | null
  isInvalid: boolean
  onClear: (index: number) => void
  onDropItem: (index: number, itemId: string) => void
  onSelectSlot: (index: number) => void
}

export function Node({ index, item, isInvalid, onClear, onDropItem, onSelectSlot }: NodeProps) {
  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault()
    const itemId = event.dataTransfer.getData('text/plain')
    onDropItem(index, itemId)
  }

  return (
    <button
      className={`heap-node ${item ? 'filled' : ''} ${isInvalid ? 'invalid' : ''}`}
      onClick={() => onSelectSlot(index)}
      onContextMenu={(event) => {
        event.preventDefault()
        onClear(index)
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      type="button"
      aria-label={item ? `No ${index + 1}, valor ${item.value}` : `No vazio ${index + 1}`}
      title="Clique para inserir o valor selecionado. Clique direito para limpar."
    >
      <span>{item?.value ?? '+'}</span>
      <small>{index === 0 ? 'raiz' : `no ${index + 1}`}</small>
    </button>
  )
}
