import React, { useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import { TripContext } from '../context/TripContext'
import { TripModal } from './TripModal'

function Trips() {
  const { tripItems, removeFromTrip, clearTrip } = useContext(TripContext)

  if (!tripItems || tripItems.length === 0) return null

  return (
    <AnimatePresence>
      {tripItems.length > 0 && (
        <TripModal
          items={tripItems}
          onRemoveItem={removeFromTrip}
          onClearTrip={clearTrip}
        />
      )}
    </AnimatePresence>
  )
}

export default Trips
