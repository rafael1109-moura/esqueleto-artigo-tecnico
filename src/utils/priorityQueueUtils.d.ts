import type { PriorityQueueItem, PriorityQueueMode } from '../types'

export function comparePriority(firstItem: PriorityQueueItem, secondItem: PriorityQueueItem): number

export function createPriorityQueueItem(value: string, priority: number): PriorityQueueItem

export function insertUnordered(queue: PriorityQueueItem[], item: PriorityQueueItem): PriorityQueueItem[]

export function insertOrdered(queue: PriorityQueueItem[], item: PriorityQueueItem): PriorityQueueItem[]

export function insertByMode(
  queue: PriorityQueueItem[],
  item: PriorityQueueItem,
  mode: PriorityQueueMode,
): PriorityQueueItem[]

export function findHighestPriorityIndex(queue: PriorityQueueItem[]): number

export function removeHighestPriorityUnordered(queue: PriorityQueueItem[]): {
  nextQueue: PriorityQueueItem[]
  removedItem: PriorityQueueItem | null
  inspectedCount: number
}

export function removeHighestPriorityOrdered(queue: PriorityQueueItem[]): {
  nextQueue: PriorityQueueItem[]
  removedItem: PriorityQueueItem | null
  inspectedCount: number
}

export function removeHighestPriorityByMode(
  queue: PriorityQueueItem[],
  mode: PriorityQueueMode,
): {
  nextQueue: PriorityQueueItem[]
  removedItem: PriorityQueueItem | null
  inspectedCount: number
}
