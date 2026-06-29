import { useEffect, useState } from 'react'
import { Controls } from '../components/Controls'
import { Feedback } from '../components/Feedback'
import { HeapTree } from '../components/HeapTree'
import { PriorityQueue } from '../components/PriorityQueue'
import { useHeap } from '../hooks/useHeap'

function Home() {
  const heap = useHeap()
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const storedTheme = window.localStorage.getItem('heap-theme')

    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('heap-theme', theme)
  }, [theme])

  return (
    <main className="app-shell">
      <section className="intro-band">
        <div>
          <button
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            aria-pressed={theme === 'dark'}
            className="theme-toggle"
            onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
            type="button"
          >
            <svg aria-hidden="true" className="theme-toggle__icon" viewBox="0 0 24 24">
              <path d="M21 12.8A8.8 8.8 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
            <span>{theme === 'dark' ? 'Claro' : 'Escuro'}</span>
          </button>
          <p className="eyebrow"></p>
          <h1 className="intro-title">Heap, HeapSort e Listas de Prioridade</h1>
          <p className="intro-text">
            Explore as mesmas ideias por três perspectivas: montar um heap como árvore, acompanhar o HeapSort 
            passo a passo e comparar listas de prioridade. A lista não ordenada insere rápido no final, enquanto a lista 
            ordenada mantém os valores em ordem crescente, facilita buscas, mas não possui estrutura em árvore como o heap.
          </p>
        </div>
      </section>

      <section className="lesson-band">
        <article>
          <h2>O que é um Heap?</h2>
          <p>
            Heap é uma árvore binária completa em que cada pai respeita uma regra em relação aos filhos. 
            No min-heap, o pai é menor ou igual aos filhos. No max-heap, o pai é maior ou igual. 
            A raiz concentra o valor mais importante para a regra escolhida.
          </p>
        </article>
        <article>
          <h2>HeapSort</h2>
          <p>
            O HeapSort cria um max-heap, extrai repetidamente o maior valor e coloca esse valor na parte ordenada da lista. 
            A visualização destaca o trecho que ainda é heap e o trecho que já foi ordenado.
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
              <p className="eyebrow">Prática</p>
              <h2>Monte o heap manualmente</h2>
              <p className="section-note">
                Preencha todos os nós e valide se cada pai respeita a regra do modo selecionado.
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
