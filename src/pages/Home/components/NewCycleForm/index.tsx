import { useFormContext } from 'react-hook-form'
import { FormContainer, MinutesAmountinput, TaskInput } from './style'
import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestion"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestion">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountinput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={0}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
