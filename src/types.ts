export type HeapMode = 'min' | 'max'

export type HeapItem = {
  id: string
  value: number
}

export type HeapSlot = HeapItem | null

export type ValidationIssue = {
  parentIndex: number
  childIndex: number
  parentValue: number
  childValue: number
  message: string
}

export type ValidationResult = {
  isComplete: boolean
  isValid: boolean
  issues: ValidationIssue[]
  message: string
}

export type SortStep = {
  title: string
  heap: number[]
  sorted: number[]
  activeIndices: number[]
  description: string
}
