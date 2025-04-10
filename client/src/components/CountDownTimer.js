import React, { useEffect, useState } from 'react'
export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 148,
    minutes: 0,
    seconds: 0,
  })
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1,
          }
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59,
          }
        } else if (prev.hours > 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59,
          }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="text-center">
      <div className="text-3xl font-mono space-x-2">
        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
      </div>
      <p className="text-gray-600 mt-2">Until Launch</p>
    </div>
  )
}

