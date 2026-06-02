import type { SortStep } from '../types'

function swap(values: number[], firstIndex: number, secondIndex: number) {
  const temporary = values[firstIndex]
  values[firstIndex] = values[secondIndex]
  values[secondIndex] = temporary
}

function heapifyDown(values: number[], startIndex: number, heapSize: number, steps: SortStep[]) {
  let currentIndex = startIndex

  while (true) {
    const leftIndex = currentIndex * 2 + 1
    const rightIndex = currentIndex * 2 + 2
    let largestIndex = currentIndex

    if (leftIndex < heapSize && values[leftIndex] > values[largestIndex]) {
      largestIndex = leftIndex
    }

    if (rightIndex < heapSize && values[rightIndex] > values[largestIndex]) {
      largestIndex = rightIndex
    }

    if (largestIndex === currentIndex) {
      break
    }

    swap(values, currentIndex, largestIndex)
    steps.push({
      title: 'Reorganizar heap',
      heap: values.slice(0, heapSize),
      sorted: values.slice(heapSize),
      activeIndices: [currentIndex, largestIndex],
      description: `Trocamos ${values[largestIndex]} com ${values[currentIndex]} para manter o max-heap.`,
    })
    currentIndex = largestIndex
  }
}

export function buildHeapSortSteps(inputValues: number[]): SortStep[] {
  const values = [...inputValues]
  const steps: SortStep[] = [
    {
      title: 'Valores iniciais',
      heap: [...values],
      sorted: [],
      activeIndices: [],
      description: 'Comecamos com os mesmos valores do exercicio.',
    },
  ]

  for (let index = Math.floor(values.length / 2) - 1; index >= 0; index -= 1) {
    heapifyDown(values, index, values.length, steps)
  }

  steps.push({
    title: 'Max-heap pronto',
    heap: [...values],
    sorted: [],
    activeIndices: [0],
    description: 'O maior valor esta na raiz. Agora ele pode ser levado para o fim da lista.',
  })

  for (let heapSize = values.length; heapSize > 1; heapSize -= 1) {
    swap(values, 0, heapSize - 1)
    steps.push({
      title: 'Extrair maior',
      heap: values.slice(0, heapSize - 1),
      sorted: values.slice(heapSize - 1),
      activeIndices: [0, heapSize - 1],
      description: `Movemos ${values[heapSize - 1]} para a area ordenada.`,
    })

    heapifyDown(values, 0, heapSize - 1, steps)
  }

  steps.push({
    title: 'Lista ordenada',
    heap: [],
    sorted: [...values],
    activeIndices: [],
    description: 'Quando o heap fica vazio, todos os valores estao em ordem crescente.',
  })

  return steps
}
