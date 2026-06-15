import type { HeapItem, HeapMode } from '../types'

export function generateRandomValues(count = 6): HeapItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `value-${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
    value: Math.floor(Math.random() * 80) + 10,
  }))
}

export function getParentIndex(index: number) {
  return Math.floor((index - 1) / 2)
}

export function getChildrenIndices(index: number, length: number) {
  const left = index * 2 + 1
  const right = index * 2 + 2

  return [left, right].filter((childIndex) => childIndex < length)
}

export function compareForHeap(parent: number, child: number, mode: HeapMode) {
  return mode === 'min' ? parent <= child : parent >= child
}

export function sortedValues(values: HeapItem[]) {
  return [...values.map((item) => item.value)].sort((a, b) => a - b)
}
