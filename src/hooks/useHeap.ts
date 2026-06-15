import { useMemo, useState } from 'react'
import type { HeapItem, HeapMode, HeapSlot, ValidationResult } from '../types'
import { generateRandomValues, sortedValues } from '../utils/heapUtils'
import { buildHeapSortSteps } from '../utils/heapSort'
import { validateHeap } from '../utils/validation'

const SLOT_COUNT = 6

function emptySlots(): HeapSlot[] {
  return Array.from({ length: SLOT_COUNT }, () => null)
}

export function useHeap() {
  const [values, setValues] = useState<HeapItem[]>(() => generateRandomValues(SLOT_COUNT))
  const [slots, setSlots] = useState<HeapSlot[]>(() => emptySlots())
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [mode, setMode] = useState<HeapMode>('min')
  const [feedback, setFeedback] = useState<ValidationResult | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const placedIds = useMemo(
    () => new Set(slots.filter((slot) => slot !== null).map((slot) => slot.id)),
    [slots],
  )

  const availableValues = values.filter((item) => !placedIds.has(item.id))
  const sortSteps = useMemo(() => buildHeapSortSteps(values.map((item) => item.value)), [values])
  const sortedList = sortedValues(values)

  function generateNewExercise() {
    setValues(generateRandomValues(SLOT_COUNT))
    setSlots(emptySlots())
    setSelectedItemId(null)
    setFeedback(null)
    setCurrentStepIndex(0)
  }

  function setHeapMode(nextMode: HeapMode) {
    setMode(nextMode)
    setFeedback(null)
  }

  function selectItem(itemId: string) {
    setSelectedItemId((currentId) => (currentId === itemId ? null : itemId))
  }

  function placeItem(slotIndex: number, itemId = selectedItemId) {
    if (!itemId) {
      return
    }

    const item = values.find((candidate) => candidate.id === itemId)

    if (!item) {
      return
    }

    setSlots((currentSlots) => {
      const nextSlots = currentSlots.map((slot) => (slot?.id === itemId ? null : slot))
      nextSlots[slotIndex] = item
      return nextSlots
    })
    setSelectedItemId(null)
    setFeedback(null)
  }

  function clearSlot(slotIndex: number) {
    setSlots((currentSlots) => currentSlots.map((slot, index) => (index === slotIndex ? null : slot)))
    setFeedback(null)
  }

  function validateCurrentHeap() {
    const result = validateHeap(slots, mode)
    setFeedback(result)
  }

  function resetTree() {
    setSlots(emptySlots())
    setSelectedItemId(null)
    setFeedback(null)
  }

  function nextStep() {
    setCurrentStepIndex((index) => Math.min(index + 1, sortSteps.length - 1))
  }

  function previousStep() {
    setCurrentStepIndex((index) => Math.max(index - 1, 0))
  }

  return {
    availableValues,
    currentSortStep: sortSteps[currentStepIndex],
    currentStepIndex,
    feedback,
    mode,
    selectedItemId,
    slots,
    sortedList,
    sortSteps,
    clearSlot,
    generateNewExercise,
    nextStep,
    placeItem,
    previousStep,
    resetTree,
    selectItem,
    setHeapMode,
    validateCurrentHeap,
  }
}
