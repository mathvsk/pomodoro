import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './style'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function CountDown() {
  const {
    activeCycle,
    activeCycleID,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle || activeCycle.finished) {
      return
    }

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )

      if (secondsDifference < totalSeconds) {
        return setSecondsPassed(secondsDifference)
      }

      markCurrentCycleAsFinished()
      setSecondsPassed(secondsDifference)
    }, 1000)

    // return serve para resetar o meu contador, quando eu iniciar um ciclo novo
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleID,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  useEffect(() => {
    if (!activeCycle) {
      return
    }

    document.title = `${minutes}:${seconds} | Pomodoro`
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
