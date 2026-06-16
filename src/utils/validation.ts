import type { HeapMode, HeapSlot, ValidationIssue, ValidationResult } from '../types'
import { compareForHeap, getChildrenIndices } from './heapUtils'

export function validateHeap(slots: HeapSlot[], mode: HeapMode): ValidationResult {
  const isComplete = slots.every((slot) => slot !== null)
  const issues: ValidationIssue[] = []

  slots.forEach((slot, parentIndex) => {
    if (!slot) {
      return
    }

    getChildrenIndices(parentIndex, slots.length).forEach((childIndex) => {
      const child = slots[childIndex]

      if (!child) {
        return
      }

      if (!compareForHeap(slot.value, child.value, mode)) {
        const relation = mode === 'min' ? 'menor ou igual' : 'maior ou igual'
        issues.push({
          parentIndex,
          childIndex,
          parentValue: slot.value,
          childValue: child.value,
          message: `O pai ${slot.value} deveria ser ${relation} ao filho ${child.value}.`,
        })
      }
    })
  })

  if (!isComplete) {
    return {
      isComplete,
      isValid: false,
      issues,
      message: 'Preencha todos os nós da árvore antes de validar o heap.',
    }
  }

  if (issues.length > 0) {
    return {
      isComplete,
      isValid: false,
      issues,
      message: issues[0].message,
    }
  }

  return {
    isComplete,
    isValid: true,
    issues,
    message:
      mode === 'min'
        ? 'Correto: cada pai e menor ou igual aos seus filhos.'
        : 'Correto: cada pai e maior ou igual aos seus filhos.',
  }
}
