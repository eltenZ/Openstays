// src/components/ExperienceCard.js
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  Users,
  X,
} from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import { TripContext } from '../context/TripContext';

export default function ExperienceCard({ experience }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const { addToTrip } = useContext(TripContext);

  const handleAddExperience = () => {
    if (!selectedDate) return alert('Please select a date');
    if (guests < 1) return alert('Please select at least one guest');

    const total = experience.pricePerPerson * guests;

    const bookingData = {
      type: 'experience',
      id: Date.now().toString(),
      experienceId: experience.id,
      name: experience.title,
      location: experience.location,
      price: experience.pricePerPerson,
      guests,
      date: selectedDate,
      total,
    };

    addToTrip(bookingData);
    alert(`${experience.title} added to your trip`);
    setSelectedDate(null);
    setGuests(1);
    setShowBooking(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-stone-100 overflow-visible relative">
      {/* Image */}
      <div className="relative">
        <ImageCarousel imageUrls={experience.imageUrls} title={experience.title} />

        {experience.isVerified && (
          <div className="absolute top-3 left-3 glass-badge px-2.5 py-1.5 rounded-lg flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-terracotta-500" />
            <span className="text-xs font-semibold text-stone-900 tracking-wide">Verified</span>
          </div>
        )}
      </div>

      {/* Basic Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-stone-900 leading-tight mb-2">{experience.title}</h3>
        <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-3">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{experience.location}</span>
        </div>
        <p className="text-stone-600 text-sm line-clamp-2 mb-4 flex-1">{experience.shortDescription}</p>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-lg font-bold text-terracotta-500">Kes {experience.pricePerPerson}</span>
          <span className="text-xs text-stone-500 font-medium">/ person</span>
        </div>

        {/* Details Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 text-sm font-semibold text-stone-700 border border-stone-200 rounded-lg"
        >
          Details
        </button>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-stone-50 border-t border-stone-100 p-5"
          >
            <div className="relative">
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-2 right-2 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <h4 className="text-sm font-semibold text-stone-900 mb-2">About this experience</h4>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">{experience.fullDescription}</p>

              {experience.highlights.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-stone-900 mb-2">Highlights</h4>
                  <ul className="space-y-1">
                    {experience.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                        <CheckCircle className="w-4 h-4 text-terracotta-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-md text-xs">
                  <Users className="w-3.5 h-3.5" />
                  {experience.ageRating}
                </div>

                <div className="px-2.5 py-1 bg-white border border-stone-200 rounded-md text-xs font-medium">
                  {experience.category}
                </div>
              </div>

              {/* Reserve Button inside expanded section */}
              {!showBooking && (
                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full py-2 bg-black text-white rounded-lg mt-3"
                >
                  Reserve
                </button>
              )}

              {/* Booking Inputs */}
              <AnimatePresence>
                {showBooking && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-stone-200 rounded-lg p-4 mt-3"
                  >
                    <h4 className="text-sm font-semibold mb-2">Select Date & Guests</h4>
                    <input
                      type="date"
                      className="w-full mb-3 p-2 border rounded"
                      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-stone-700">Guests</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="px-2 py-1 bg-stone-200 rounded"
                        >
                          -
                        </button>
                        <span>{guests}</span>
                        <button
                          onClick={() => setGuests(guests + 1)}
                          className="px-2 py-1 bg-stone-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleAddExperience}
                      className="w-full py-2 bg-black text-white rounded-lg"
                    >
                      Add to Trip
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
