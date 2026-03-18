import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  Users,
  X,
} from 'lucide-react'
import ImageCarousel from './ImageCarousel'

export default function ExperienceCard({ experience }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-stone-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative">
        <ImageCarousel
          imageUrls={experience.imageUrls}
          title={experience.title}
        />

        {/* Verified Badge */}
        {experience.isVerified && (
          <div className="absolute top-3 left-3 glass-badge px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 z-10">
            <ShieldCheck className="w-4 h-4 text-terracotta-500" />
            <span className="text-xs font-semibold text-stone-900 tracking-wide">
              Verified
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Title */}
        <h3 className="text-lg font-bold text-stone-900 leading-tight mb-2">
          {experience.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-3">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{experience.location}</span>
        </div>

        {/* Short Description */}
        <p className="text-stone-600 text-sm line-clamp-2 mb-4 flex-1">
          {experience.shortDescription}
        </p>

        {/* Price + Duration */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-terracotta-500">
                Kes {experience.pricePerPerson}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                / person
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-stone-400 text-xs mt-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{experience.duration}</span>
            </div>
          </div>

          {/* Details Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 text-sm font-semibold text-stone-700 border border-stone-200 rounded-lg hover:bg-stone-50 hover:border-stone-300 transition-colors"
          >
            Details
          </button>
        </div>
      </div>

      {/* Expanded Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-stone-50 border-t border-stone-100"
          >
            <div className="p-5 relative">

              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Full Description */}
              <div className="mb-6 pr-8">
                <h4 className="text-sm font-semibold text-stone-900 mb-2">
                  About this experience
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {experience.fullDescription}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-stone-900 mb-3">
                  Highlights
                </h4>
                <ul className="space-y-2">
                  {experience.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-stone-600"
                    >
                      <CheckCircle className="w-4 h-4 text-terracotta-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-md text-xs font-medium text-stone-600">
                  <Users className="w-3.5 h-3.5" />
                  {experience.ageRating}
                </div>

                <div className="px-2.5 py-1 bg-white border border-stone-200 rounded-md text-xs font-medium text-stone-600">
                  {experience.category}
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-3 bg-black  hover:bg-terracotta-600 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-[0.98]">
                Reserve Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
