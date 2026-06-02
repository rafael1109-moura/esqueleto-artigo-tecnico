import type { HeapSlot, ValidationIssue } from '../types'
import { Node } from './Node'

type HeapTreeProps = {
  slots: HeapSlot[]
  issues: ValidationIssue[]
  onClear: (index: number) => void
  onDropItem: (index: number, itemId: string) => void
  onSelectSlot: (index: number) => void
}

export function HeapTree({ slots, issues, onClear, onDropItem, onSelectSlot }: HeapTreeProps) {
  const invalidIndices = new Set(issues.flatMap((issue) => [issue.parentIndex, issue.childIndex]))

  return (
    <div className="tree-shell" aria-label="Arvore binaria completa para montar o heap">
      <div className="tree-lines" aria-hidden="true">
        <span className="edge edge-0-1" />
        <span className="edge edge-0-2" />
        <span className="edge edge-1-3" />
        <span className="edge edge-1-4" />
        <span className="edge edge-2-5" />
      </div>
      <div className="heap-tree">
        {slots.map((slot, index) => (
          <div className={`node-position node-${index}`} key={index}>
            <Node
              index={index}
              item={slot}
              isInvalid={invalidIndices.has(index)}
              onClear={onClear}
              onDropItem={onDropItem}
              onSelectSlot={onSelectSlot}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
