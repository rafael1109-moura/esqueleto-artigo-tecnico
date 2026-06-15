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
          <p className="eyebrow">Estruturas de dados interativas</p>
          <h1>Heap, HeapSort e Listas de Prioridade</h1>
          <p className="intro-text">
            Explore as mesmas ideias por tres perspectivas: montar um heap como arvore, acompanhar o HeapSort passo a
            passo e comparar listas de prioridade. A lista nao ordenada insere rapido no final, enquanto a lista ordenada
            mantem os valores em ordem crescente, facilita buscas, mas nao possui estrutura em arvore como o heap.
          </p>
        </div>
      </section>

      <section className="lesson-band">
        <article>
          <h2>O que e um Heap?</h2>
          <p>
            Heap e uma arvore binaria completa em que cada pai respeita uma regra em relacao aos filhos. No min-heap, o
            pai e menor ou igual aos filhos. No max-heap, o pai e maior ou igual. A raiz concentra o valor mais
            importante para a regra escolhida.
          </p>
        </article>
        <article>
          <h2>HeapSort</h2>
          <p>
            O HeapSort cria um max-heap, extrai repetidamente o maior valor e coloca esse valor na parte ordenada da
            lista. A visualizacao destaca o trecho que ainda e heap e o trecho que ja foi ordenado.
          </p>
        </article>
        <article>
          <h2>Listas e heap</h2>
          <p>
            Listas guardam elementos em sequencia. O heap organiza valores como uma arvore binaria completa e garante
            acesso eficiente ao menor ou maior valor. A lista de prioridade mostra o contraste entre inserir rapido e
            remover rapido.
          </p>
        </article>
      </section>

      <section className="interactive-layout">
        <div className="heap-area">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Pratica</p>
              <h2>Monte o heap manualmente</h2>
              <p className="section-note">
                Preencha todos os nos e valide se cada pai respeita a regra do modo selecionado.
              </p>
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
