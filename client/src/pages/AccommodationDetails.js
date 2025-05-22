// src/pages/AccommodationDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

import ImageCarousel from "../components/ImageCarousel";
import AccommodationHeader from "../components/AccommodationHeader";
import Description from "../components/Description";
import Amenities from "../components/Amenities";
import LocationMap from "../components/LocationMap";
import HostInfo from "../components/HostInfo";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import BookingCalendar from "../components/BookingCalendar";

// Helper to convert API’s date‐range records into an array of Date objects that are unavailable.
function extractUnavailableDates(records) {
  const unavailable = [];
  records.forEach((r) => {
    if (!r.is_available) {
      let current = new Date(r.start_date);
      const end = new Date(r.end_date);
      while (current <= end) {
        unavailable.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    }
  });
  return unavailable;
}

const AccommodationDetails = ({ addBookingItem }) => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null,
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);  // ← always an array
  const [totalPrice, setTotalPrice] = useState(null);

  // Fetch accommodation details
  useEffect(() => {
    async function fetchDetails() {
      try {
	setLoading(true); // Reset loading state
        const res = await fetch(`http://localhost:5000/api/accommodation/${id}`);
        if (!res.ok) throw new Error("Failed to fetch accommodation details");
        const data = await res.json();

         // Split image_urls into an array and prefix with the server's base URL
      data.image_urls = data.image_urls
      ? data.image_urls.split(",").map((url) => `http://localhost:5000/${url.trim()}`)
      : [];
      
        data.amenities = data.amenities.split(",").map((a) => a.trim());
        setAccommodation(data);
 setAccommodation({
 ...data,
  // ensure we have an array even if DB returns null
 highlights: Array.isArray(data.highlights) ? data.highlights : []
 });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  // Fetch availability whenever month or id changes
  useEffect(() => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    const start_date = new Date(y, m, 1).toISOString().split("T")[0];
    const end_date = new Date(y, m + 1, 0).toISOString().split("T")[0];

    async function fetchAvail() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/availability?accommodation_id=${id}&start_date=${start_date}&end_date=${end_date}`
        );
        if (!res.ok) throw new Error("Failed to fetch availability");
        const records = await res.json();
        const safe = Array.isArray(records) ? records : [];
        if (!Array.isArray(records)) {
          console.warn("availability API returned non‑array:", records);
        }
        setUnavailableDates(extractUnavailableDates(safe));
      } catch (err) {
        console.error("Error loading availability:", err.message);
      }
    }
    fetchAvail();
  }, [id, currentMonth]);

  // Compute total price
  useEffect(() => {
    const { checkIn, checkOut } = selectedDates;
    if (checkIn && checkOut && accommodation) {
      const nights = Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      setTotalPrice(nights * accommodation.price_per_night);
    } else {
      setTotalPrice(null);
    }
  }, [selectedDates, accommodation]);

  const handleDateSelection = (checkIn, checkOut) => {
    setSelectedDates({ checkIn, checkOut });
  };

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  const handleBookingSubmit = () => {
    const { checkIn, checkOut } = selectedDates;
    if (!checkIn || !checkOut) return;
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    const newBooking = {
      id: Date.now().toString(),
      name: accommodation.title,
      location: accommodation.location,
      price: accommodation.price_per_night,
      nights,
      checkIn,
      checkOut,
      hostId: accommodation.host_id,
      amenities: accommodation.amenities,
    };
    addBookingItem && addBookingItem(newBooking);
    setSelectedDates({ checkIn: null, checkOut: null });
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;

  return (
  <div className="w-full bg-white">
  {/* Header Navigation */}
  <div className="px-4 py-4 border-b border-gray-200">
    <div className="max-w-7xl flex items-center">
      <a href="#" className="flex items-center text-gray-600 hover:text-gray-900">
        <ChevronLeftIcon size={16} />
        <span className="ml-1 text-sm">Back to search results</span>
      </a>
    </div>
  </div>

  {/* Main content */}
  <main className="max-w-7xl mx-auto px-4 py-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left/Main Column */}
      <div className="lg:col-span-2">
        <ImageCarousel imageUrls={accommodation.image_urls} />
        <div className="mt-6">
          <AccommodationHeader
            title={accommodation.title}
            location={accommodation.location}
            rating={accommodation.rating || 4.5}
            pricePerNight={accommodation.price_per_night}
          />
        </div>

        <hr className="py-4" />
        <Description
          description={accommodation.description}
          highlights={accommodation.highlights}
          
        />

        <hr className="my-8 border-gray-200" />
        <Amenities amenities={accommodation.amenities} />
{/* Mobile calendar display */}
<div className="lg:hidden mt-8">
  <div className="rounded-lg p-4 border border-gray-200">
    <BookingCalendar
      onDateSelection={handleDateSelection}
      selectedDates={selectedDates}
      unavailableDates={unavailableDates}
      currentMonth={currentMonth}
      onMonthChange={handleMonthChange}
    />
    {totalPrice && (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total</span>
          <span className="font-semibold">Kes {totalPrice}</span>
        </div>
      </div>
    )}
    <button
      onClick={handleBookingSubmit}
      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
    >
      Reserve
    </button>
  </div>
<div className="mt-4 flex justify-between">
  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
    Save to Wishlist
  </button>
  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
    Share Listing
  </button>
</div>

<div className="mt-6 p-4 bg-gray-50 rounded-lg">
  <h3 className="font-medium text-sm">Not available for your dates?</h3>
  <p className="text-sm text-gray-600 mt-1">
    Get notified when this property becomes available.
  </p>
  <button className="mt-2 w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
    Set Availability Alert
  </button>
</div>
</div>

        <hr className="my-8 border-gray-200" />
        <LocationMap location={accommodation.location} />

        <hr className="my-8 border-gray-200" />
        <HostInfo
  name={accommodation.host_name}
  photo={accommodation.host_photo}
  rating={accommodation.host_rating}
  joinYear={accommodation.host_join_year}
  bio={accommodation.host_bio}
  languages={accommodation.host_languages}
  responseRate={accommodation.host_response_rate}
  style={accommodation.host_style}
  work={accommodation.host_work}
/>

        <hr className="my-8 border-gray-200" />
        <div className="lg:hidden">
           <Reviews accommodationId={id} vertical={false} />
          <hr className="my-8 border-gray-200" />
        </div>

        <FAQ />
      </div>

      {/* Right/Sidebar Column */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-8 space-y-4">
          <div className="rounded-lg p-6 border border-gray-200">
            <BookingCalendar
              onDateSelection={handleDateSelection}
              selectedDates={selectedDates}
              unavailableDates={unavailableDates}
              currentMonth={currentMonth}
              onMonthChange={handleMonthChange}
            />

            {totalPrice && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold">Kes {totalPrice}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleBookingSubmit}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Reserve
            </button>

            <div className="mt-4 flex justify-between">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Save to Wishlist
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Share Listing
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-sm">Not available for your dates?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Get notified when this property becomes available.
              </p>
              <button className="mt-2 w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                Set Availability Alert
              </button>
            </div>
          </div>

          <div className="hidden lg:block border border-gray-200 rounded-lg">
	 <Reviews accommodationId={id} vertical={true} />
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

  );
};
export default AccommodationDetails;
