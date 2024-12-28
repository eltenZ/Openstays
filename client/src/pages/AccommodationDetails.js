import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Tv,
  BedDouble, X, Minus, Plus
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import SuccessModal from "../components/SuccessModal";

const AccommodationDetails = ({ addBookingItem }) => {
  const { id } = useParams();

  // States
  const [accommodation, setAccommodation] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const [guests, setGuests] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Accommodation Details
  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(`http://192.168.24.100:5000/api/accommodation/${id}`);
        if (!response.ok) throw new Error("Failed to fetch accommodation details");
        const data = await response.json();
        data.amenities = data.amenities.split(",").map((item) => item.trim());
        setAccommodation(data);

        // Fetch availability data
        await fetchAvailability(id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationDetails();
  }, [id]);

  // Fetch Availability Data
  const fetchAvailability = async (accommodationId) => {
    try {
      const response = await fetch(
        `http://192.168.24.100:5000/api/availability?accommodation_id=${accommodationId}`
      );
      if (!response.ok) throw new Error("Failed to fetch availability");
      const data = await response.json();
      setAvailability(data);
    } catch (err) {
      console.error("Error fetching availability:", err.message);
    }
  };

  // Generate Disabled Dates
  const generateDisabledDates = (availability) =>
    Array.isArray(availability)
      ? availability.filter((range) => !range.is_available).map((range) => ({
          from: new Date(range.start_date),
          to: new Date(range.end_date),
        }))
      : [];



  // Handle Slide Navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (accommodation?.image_urls?.length || 1));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + (accommodation?.image_urls?.length || 1)) % (accommodation?.image_urls?.length || 1)
    );
  };

  // Toggle Booking Form Visibility
  const handleBookingFormToggle = () => {
    setIsBookingFormVisible((prev) => !prev);
  };

  // Handle Booking Submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!dateRange.from || !dateRange.to) {
      alert("Please select a valid date range");
      return;
    }

    const nights = Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24));
    const totalCost = nights * accommodation.price_per_night;

    const bookingDetails = {
      id: Date.now().toString(),
      name: accommodation.title,
      location: accommodation.location,
      price: accommodation.price_per_night,
      nights,
      guests,
      checkIn: dateRange.from.toISOString().split("T")[0],
      checkOut: dateRange.to.toISOString().split("T")[0],
      hostId: accommodation.host_id,
      amenities: accommodation.amenities,
    };

    addBookingItem(bookingDetails);
    setIsModalOpen(true);
    setIsBookingFormVisible(false);

    // Reset form
    setDateRange({ from: null, to: null });
    setGuests(1);
  };

  // Handle Guest Count Change
  const handleGuestChange = (increment) => {
    setGuests((prev) => Math.max(1, prev + increment));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const iconsMapping = {
    Wifi: <Wifi className="w-6 h-6" />,
    Car: <Car className="w-6 h-6" />,
    Tv: <Tv className="w-6 h-6" />,
    Coffee: <Coffee className="w-6 h-6" />,
    Bed: <BedDouble className="w-6 h-6" />,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Image Carousel */}
      <div className="relative h-[36vh] rounded-xl overflow-hidden mb-4">

<img
  src={`${process.env.PUBLIC_URL}/${accommodation.image_urls.split(',')[0].trim()}`}
  alt={accommodation.title}
  className="w-full h-auto object-cover"
/>
        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Accommodation Info */}
      <div className="bg-white rounded-xl shadow-xs p-4 mb-2">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <h1 className="text-3xl font-bold">{accommodation?.title}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{accommodation?.location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg text-gray-600">From</p>
            <p className="text-3xl font-bold text-blue-500">Kes {accommodation?.price_per_night}/night</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* About and Amenities */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">About This Place</h2>
            <p className="text-gray-600 mb-6">{accommodation?.description}</p>
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {accommodation?.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  {iconsMapping[amenity] || <BedDouble className="w-6 h-6" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar and Booking */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow p-8 sticky top-8">
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              disabled={generateDisabledDates(availability)}
            />
            <button
              onClick={handleBookingFormToggle}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors mt-6"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>

{isBookingFormVisible && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl p-8 max-w-md w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Complete Your Booking</h3>
        <button onClick={() => setIsBookingFormVisible(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Number of Guests */}
      <div className="mb-8">
        <label className="block mb-4 font-medium">Number of Guests</label>
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={() => handleGuestChange(-1)}
            className="p-4 rounded-xl border hover:bg-gray-50 transition-colors"
          >
            <Minus className="w-6 h-6" />
          </button>
          <span className="text-2xl font-medium transition-all duration-200">{guests}</span>
          <button
            onClick={() => handleGuestChange(1)}
            className="p-4 rounded-xl border hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-6 mb-8">
        <label className="flex items-center justify-between cursor-pointer">
          <span>Early check-in if available</span>
          <div className="relative">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-hover:bg-gray-300 transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
          </div>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span>Late check-out if available</span>
          <div className="relative">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-hover:bg-gray-300 transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
          </div>
        </label>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleBookingSubmit}
        className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Confirm Booking
      </button>


    </div>
  </div>
)}
{isModalOpen && (
  <SuccessModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
  />
)}
    </main>
  );
};

export default AccommodationDetails;
