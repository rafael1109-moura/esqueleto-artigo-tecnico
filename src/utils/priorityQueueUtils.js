// A maior prioridade e representada pelo maior numero.
// Essa regra unica permite comparar os dois modos sem duplicar a logica.
export function comparePriority(firstItem, secondItem) {
  return secondItem.priority - firstItem.priority
}

export function createPriorityQueueItem(value, priority) {
  return {
    id: `priority-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    value,
    priority,
  }
}

export function insertUnordered(queue, item) {
  // Na lista nao ordenada a insercao e O(1): o novo item vai para o final.
  return [...queue, item]
}

export function insertOrdered(queue, item) {
  // Na lista ordenada pagamos o custo na insercao para manter a maior prioridade no inicio.
  return [...queue, item].toSorted(comparePriority)
}

export function insertByMode(queue, item, mode) {
  return mode === 'ordered' ? insertOrdered(queue, item) : insertUnordered(queue, item)
}

export function findHighestPriorityIndex(queue) {
  if (queue.length === 0) {
    return -1
  }

  return queue.reduce((bestIndex, item, index) => {
    const bestItem = queue[bestIndex]
    return item.priority > bestItem.priority ? index : bestIndex
  }, 0)
}

export function removeHighestPriorityUnordered(queue) {
  const highestPriorityIndex = findHighestPriorityIndex(queue)

  if (highestPriorityIndex === -1) {
    return { nextQueue: queue, removedItem: null, inspectedCount: 0 }
  }

  // Como a lista nao esta ordenada, a remocao precisa buscar a maior prioridade.
  return {
    nextQueue: queue.filter((_, index) => index !== highestPriorityIndex),
    removedItem: queue[highestPriorityIndex],
    inspectedCount: queue.length,
  }
}

export function removeHighestPriorityOrdered(queue) {
  if (queue.length === 0) {
    return { nextQueue: queue, removedItem: null, inspectedCount: 0 }
  }

  // Como a lista ja esta ordenada por prioridade, o primeiro item e removido diretamente.
  const [removedItem, ...nextQueue] = queue
  return { nextQueue, removedItem, inspectedCount: 1 }
}

export function removeHighestPriorityByMode(queue, mode) {
  return mode === 'ordered' ? removeHighestPriorityOrdered(queue) : removeHighestPriorityUnordered(queue)
}
