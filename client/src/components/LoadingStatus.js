import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'lucide-react'
const loadingMessages = [
  'Onboarding hosts...',
  'Creating adventures...',
  'Inspecting villas...',
  'Putting everything together...',
  'Refining services...',
]
export const LoadingStatus = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length)
        setIsAnimating(false)
      }, 500)
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex items-center justify-center space-x-3">
      <LoaderIcon className="w-4 h-4 animate-spin text-gray-600" />
      <span
        className={`text-gray-600 transition-all duration-500 ${isAnimating ? '-translate-x-4 opacity-0' : 'translate-x-0 opacity-100'}`}
      >
        {loadingMessages[currentMessageIndex]}
      </span>
    </div>
  )
}
