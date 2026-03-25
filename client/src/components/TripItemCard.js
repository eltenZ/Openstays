import React from 'react'
import { Home, Compass, Calendar, Users, Trash2 } from 'lucide-react'

export function TripItemCard({ item, onRemove }) {
  const isAccommodation = item.type === 'accommodation'

  return (
    <div className="py-4 border-b border-gray-100 last:border-0 group">
      
      {/* Top Row */}
      <div className="flex justify-between items-start mb-2">
        
        {/* Left: Icon + Name */}
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-lg ${
              isAccommodation
                ? 'bg-blue-50 text-blue-600'
                : 'bg-orange-50 text-orange-600'
            }`}
          >
            {isAccommodation ? <Home size={16} /> : <Compass size={16} />}
          </div>

          <h4 className="font-semibold text-gray-900">{item.name}</h4>
        </div>

        {/* Right: Price + Delete */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-900">
            KES {Number(item.total || 0).toLocaleString()}
          </span>

          {onRemove && (
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-300 hover:text-red-500 transition-colors"
              aria-label={`Remove ${item.name} from trip`}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col gap-1.5 pl-10 text-sm text-gray-500">
        
        {isAccommodation ? (
          <>
            {/* Dates */}
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>
                {item.checkIn
                  ? new Date(item.checkIn).toLocaleDateString()
                  : '-'}{' '}
                -{' '}
                {item.checkOut
                  ? new Date(item.checkOut).toLocaleDateString()
                  : '-'}
              </span>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>
                {item.guests || 1}{' '}
                {item.guests === 1 ? 'guest' : 'guests'}
              </span>
            </div>

            {/* Nights × price (optional detail) */}
            {item.nights && (
              <div className="text-xs text-gray-400">
                {item.nights} nights × KES{' '}
                {Number(item.price).toLocaleString()}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Experience Date */}
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>
                {item.date
                  ? new Date(item.date).toLocaleDateString()
                  : '-'}
              </span>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>
                {item.guests || 1}{' '}
                {item.guests === 1 ? 'guest' : 'guests'}
              </span>
            </div>

            {/* Guests × price */}
            <div className="text-xs text-gray-400">
              {item.guests || 1} × KES{' '}
              {Number(item.price).toLocaleString()}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
