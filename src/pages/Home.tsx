import { Controls } from '../components/Controls'
import { Feedback } from '../components/Feedback'
import { HeapTree } from '../components/HeapTree'
import { useHeap } from '../hooks/useHeap'

function Home() {
  const heap = useHeap()

  return (
    <main className="app-shell">
      <section className="intro-band">
        <div>
          <p className="eyebrow">Estruturas de dados interativas</p>
          <h1>Heap, HeapSort e Lista Ordenada</h1>
          <p className="intro-text">
            Monte uma arvore completa, valide a regra de heap e acompanhe como os mesmos valores se transformam em uma
            lista ordenada.
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
          <h2>Lista ordenada</h2>
          <p>
            A lista ordenada mostra todos os valores em ordem crescente. Ela facilita buscas sequenciais, mas nao tem a
            mesma forma de arvore do heap.
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
    </main>
  )
}

export default Home
