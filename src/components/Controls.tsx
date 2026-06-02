import type { DragEvent } from 'react'
import type { HeapItem, HeapMode, SortStep } from '../types'

type ControlsProps = {
  availableValues: HeapItem[]
  currentSortStep: SortStep
  currentStepIndex: number
  mode: HeapMode
  selectedItemId: string | null
  sortedList: number[]
  sortStepCount: number
  onGenerate: () => void
  onModeChange: (mode: HeapMode) => void
  onNextStep: () => void
  onPreviousStep: () => void
  onResetTree: () => void
  onSelectItem: (itemId: string) => void
  onValidate: () => void
}

export function Controls({
  availableValues,
  currentSortStep,
  currentStepIndex,
  mode,
  selectedItemId,
  sortedList,
  sortStepCount,
  onGenerate,
  onModeChange,
  onNextStep,
  onPreviousStep,
  onResetTree,
  onSelectItem,
  onValidate,
}: ControlsProps) {
  function handleDragStart(event: DragEvent<HTMLButtonElement>, itemId: string) {
    event.dataTransfer.setData('text/plain', itemId)
  }

  return (
    <aside className="workbench">
      <section className="tool-panel">
        <div className="panel-heading">
          <h2>Valores do exercicio</h2>
          <button className="ghost-button" onClick={onGenerate} type="button">
            Gerar novo
          </button>
        </div>
        <div className="value-bank" aria-label="Valores disponiveis">
          {availableValues.length === 0 ? (
            <span className="empty-state">Todos os valores foram posicionados.</span>
          ) : (
            availableValues.map((item) => (
              <button
                className={`value-pill ${selectedItemId === item.id ? 'selected' : ''}`}
                draggable
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                onDragStart={(event) => handleDragStart(event, item.id)}
                type="button"
              >
                {item.value}
              </button>
            ))
          )}
        </div>
      </section>

      <section className="tool-panel">
        <h2>Tipo de heap</h2>
        <div className="segmented-control" role="group" aria-label="Tipo de heap">
          <button className={mode === 'min' ? 'active' : ''} onClick={() => onModeChange('min')} type="button">
            Min-Heap
          </button>
          <button className={mode === 'max' ? 'active' : ''} onClick={() => onModeChange('max')} type="button">
            Max-Heap
          </button>
        </div>
        <div className="action-row">
          <button className="primary-button" onClick={onValidate} type="button">
            Validar heap
          </button>
          <button className="secondary-button" onClick={onResetTree} type="button">
            Limpar arvore
          </button>
        </div>
      </section>

      <section className="tool-panel">
        <div className="panel-heading">
          <h2>HeapSort</h2>
          <span className="step-counter">
            {currentStepIndex + 1}/{sortStepCount}
          </span>
        </div>
        <div className="sort-stage">
          <div>
            <strong>Heap</strong>
            <div className="mini-list">
              {currentSortStep.heap.length > 0 ? currentSortStep.heap.map((value, index) => (
                <span className={currentSortStep.activeIndices.includes(index) ? 'active' : ''} key={`${value}-${index}`}>
                  {value}
                </span>
              )) : <span className="muted">vazio</span>}
            </div>
          </div>
          <div>
            <strong>Ordenado</strong>
            <div className="mini-list sorted">
              {currentSortStep.sorted.map((value, index) => (
                <span key={`${value}-${index}`}>{value}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="step-text">
          <strong>{currentSortStep.title}:</strong> {currentSortStep.description}
        </p>
        <div className="action-row">
          <button className="secondary-button" disabled={currentStepIndex === 0} onClick={onPreviousStep} type="button">
            Anterior
          </button>
          <button
            className="secondary-button"
            disabled={currentStepIndex === sortStepCount - 1}
            onClick={onNextStep}
            type="button"
          >
            Proximo
          </button>
        </div>
      </section>

      <section className="tool-panel">
        <h2>Lista ordenada</h2>
        <div className="ordered-list">
          {sortedList.map((value, index) => (
            <span key={`${value}-${index}`}>{value}</span>
          ))}
        </div>
      </section>
    </aside>
  )
}
