import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupted?: boolean
  finished?: boolean
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleID: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  if (action.type === ActionTypes.ADD_NEW_CYCLE) {
    return produce(state, (draft) => {
      draft.cycles.push(action.payload.newCycle)
      draft.activeCycleID = action.payload.newCycle.id
    })
  }

  if (action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
    const currentCycleIndex = state.cycles.findIndex((cycle) => {
      return cycle.id === state.activeCycleID
    })

    if (currentCycleIndex < 0) {
      return state
    }

    return produce(state, (draft) => {
      draft.cycles[currentCycleIndex].interrupted = true
      draft.activeCycleID = null
    })
  }

  if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
    const currentCycleIndex = state.cycles.findIndex((cycle) => {
      return cycle.id === state.activeCycleID
    })

    if (currentCycleIndex < 0) {
      return state
    }

    return produce(state, (draft) => {
      draft.cycles[currentCycleIndex].finished = true
      draft.activeCycleID = null
    })
  }

  return state
}
