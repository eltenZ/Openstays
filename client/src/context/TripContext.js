import React, { createContext, useState } from 'react'

export const TripContext = createContext()

export function TripProvider({ children }) {
  const [tripItems, setTripItems] = useState([])

  const addToTrip = (item) => {
    if (!tripItems.some((i) => i.id === item.id)) {
      setTripItems((prev) => [...prev, item])
    }
  }

  const removeFromTrip = (id) => {
    setTripItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearTrip = () => {
    setTripItems([])
  }

  return (
    <TripContext.Provider
      value={{ tripItems, addToTrip, removeFromTrip, clearTrip }}
    >
      {children}
    </TripContext.Provider>
  )
}
