import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, ShoppingBag, CheckCircle2 } from 'lucide-react'
import { TripItemCard } from './TripItemCard'
import { ReservationForm } from './ReservationForm'

export function TripModal({ items, onRemoveItem, onClearTrip }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Total in KES
  const total = items.reduce((sum, item) => {
  return sum + Number(item.total || 0)
}, 0)

  // Auto-expand when first item is added
  useEffect(() => {
    if (items.length === 1 && !isExpanded && !isSuccess) setIsExpanded(true)
    if (items.length === 0) {
      setIsExpanded(false)
      setShowForm(false)
      setIsSuccess(false)
    }
  }, [items.length])

  const handleReservationSubmit = (data) => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        onClearTrip()
        setIsExpanded(false)
        setShowForm(false)
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  if (items.length === 0 && !isSuccess) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[420px] z-50">
      <motion.div
        layout
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <motion.button
          layout="position"
          onClick={() => !isSuccess && setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
            !isExpanded ? 'hover:bg-gray-50' : 'border-b border-gray-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-sm">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Your Trip
              </p>
              <p className="text-lg font-bold text-gray-900">
                KES {Number(total).toLocaleString()}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </p>
            </div>
          </div>
          {!isSuccess && (
            <div className="text-gray-400 bg-gray-50 p-2 rounded-full">
              {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </div>
          )}
        </motion.button>

        {/* Expanded Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex flex-col max-h-[70vh]"
            >
              {isSuccess ? (
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="text-green-500 mb-4"
                  >
                    <CheckCircle2 size={64} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Reservation Requested!
                  </h3>
                  <p className="text-gray-500">
                    The host will confirm your booking shortly. Check your email for details.
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-y-auto p-4 flex-1 custom-scrollbar">
                    {items.map((item) => (
                      <TripItemCard key={item.id} item={item} onRemove={onRemoveItem} />
                    ))}
                  </div>

                  <div className="p-4 bg-gray-50/80 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600 font-medium">Total (KES)</span>
                      <span className="font-bold text-2xl text-gray-900">
                        KES {total.toLocaleString()}
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      {!showForm ? (
                        <motion.button
                          key="request-btn"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          onClick={() => setShowForm(true)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition-colors shadow-sm"
                        >
                          Request Reservation
                        </motion.button>
                      ) : (
                        <ReservationForm
                          key="form"
                          onSubmit={handleReservationSubmit}
                          isSubmitting={isSubmitting}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
