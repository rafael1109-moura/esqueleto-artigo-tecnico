import { Controls } from '../components/Controls'
import { Feedback } from '../components/Feedback'
import { HeapTree } from '../components/HeapTree'
import { PriorityQueue } from '../components/PriorityQueue'
import { useHeap } from '../hooks/useHeap'

function Home() {
  const heap = useHeap()

  return (
    <main className="app-shell">
      <section className="intro-band">
        <div>
          <h1>Heap, HeapSort e Listas de Prioridade</h1>
          <p className="intro-text">
            Compare listas de prioridade nao ordenadas, listas ordenadas e heaps. A lista nao ordenada insere rapido no
            final, mas precisa buscar o maior item ao remover. A lista ordenada mantem os valores em ordem crescente,
            facilita buscas, mas nao possui estrutura em arvore como o heap.
          </p>
        </div>
      </section>

      <section className="lesson-band">
        <article>
          <h2>O que e um Heap?</h2>
          <p>
            Heap e uma arvore binaria completa em que cada pai respeita uma regra em relacao aos filhos. No min-heap, o
            pai e menor ou igual aos filhos. No max-heap, o pai e maior ou igual.
          </p>
        </article>
        <article>
          <h2>HeapSort</h2>
          <p>
            O HeapSort cria um max-heap, extrai repetidamente o maior valor e coloca esse valor na parte ordenada da
            lista.
          </p>
        </article>
        <article>
          <h2>Lista de Prioridade</h2>
          <p>
            Organiza elementos por prioridade, não por ordem de inserção. O item com maior (ou menor) 
            prioridade é removido primeiro. Pode ser implementada de forma ordenada ou não ordenada.
          </p>
        </article>
      </section>

      <section className="interactive-layout">
        <div className="heap-area">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Pratica</p>
              <h2>Monte o heap manualmente</h2>
            </div>
            <span className="mode-chip">{heap.mode === 'min' ? 'Min-Heap' : 'Max-Heap'}</span>
          </div>
          <HeapTree
            slots={heap.slots}
            issues={heap.feedback?.issues ?? []}
            onClear={heap.clearSlot}
            onDropItem={heap.placeItem}
            onSelectSlot={heap.placeItem}
          />
          <Feedback feedback={heap.feedback} />
        </div>

        <Controls
          availableValues={heap.availableValues}
          currentSortStep={heap.currentSortStep}
          currentStepIndex={heap.currentStepIndex}
          mode={heap.mode}
          selectedItemId={heap.selectedItemId}
          sortedList={heap.sortedList}
          sortStepCount={heap.sortSteps.length}
          onGenerate={heap.generateNewExercise}
          onModeChange={heap.setHeapMode}
          onNextStep={heap.nextStep}
          onPreviousStep={heap.previousStep}
          onResetTree={heap.resetTree}
          onSelectItem={heap.selectItem}
          onValidate={heap.validateCurrentHeap}
        />
      </section>

      <PriorityQueue />
    </main>
  )
}

export default Home
