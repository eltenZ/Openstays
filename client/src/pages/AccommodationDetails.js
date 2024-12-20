import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Minus, Plus, Wifi, Car, Tv, Coffee, BedDouble } from "lucide-react";

const AccommodationDetails = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isbookingformVisible, setIsbookingformVisible] = useState(false); 
 const [bookingDetails, setBookingDetails] = useState({
  name: "",
  mobile: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  specialRequests: [],
});
  const [errors, setErrors] = useState({});
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  // Fetch Accommodation Details
  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/accommodation/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch accommodation details");
        }
        const data = await response.json();
        data.amenities = data.amenities.split(",").map((item) => item.trim());
        setAccommodation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationDetails();
  }, [id]);

  // Calendar Generation
  const generateCalendar = (monthOffset = 0) => {
    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = currentMonth.getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return {
      month: currentMonth.toLocaleString("default", { month: "long" }),
      year: currentMonth.getFullYear(),
      days,
    };
  };

  const calendar = generateCalendar(currentMonthOffset);

  // Handle Booking Form Submission

const handleBookingSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};
  const { name, email, checkIn, checkOut, guests, specialRequests } = bookingDetails;

  // Validate form inputs
  if (!name.trim()) newErrors.name = "Name is required.";
  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format.";
  }
  if (!checkIn) newErrors.checkIn = "Check-in date is required.";
  if (!checkOut) newErrors.checkOut = "Check-out date is required.";
  if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
    newErrors.dates = "Check-out date must be after check-in date.";
  }
  if (guests < 1) newErrors.guests = "At least 1 guest is required.";

  // Check for errors
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // Simulate API call for booking
  console.log("Booking Details Submitted:", { ...bookingDetails, totalCost, nights });
  alert("Booking successfully submitted!");

};

const handleBookingChange = (e) => {
  const { name, value } = e.target;
  setBookingDetails((prev) => ({ ...prev, [name]: value }));
};

const handleSpecialRequestsChange = (e) => {
  const { value, checked } = e.target;
  setBookingDetails((prev) => ({
    ...prev,
    specialRequests: checked
      ? [...prev.specialRequests, value]
      : prev.specialRequests.filter((req) => req !== value),
  }));
};

const handleGuestChange = (increment) => {
  setBookingDetails((prev) => ({
    ...prev,
    guests: Math.max(1, prev.guests + increment),
  }));
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

// Calculate the number of nights and total cost
const nights =
  bookingDetails.checkIn && bookingDetails.checkOut
    ? Math.ceil(
        (new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 60 * 60 * 24)
      )
    : 0;
const totalCost = nights * accommodation.price_per_night;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      {/* Accommodation Details */}
      <section className="mb-4">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={`http://localhost:5000/${accommodation.image_urls}`}
            alt="Accommodation"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </section>

      <section className="mb-4">
        <div className="backdrop-blur-sm bg-white/90 p-6 rounded-2xl border border-white/20 shadow-lg">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">{accommodation.title}</h1>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★ {accommodation.rating || 4.5}</span>
              
            </div>
          </div>
          <p className="text-gray-600">{accommodation.location}</p>
	  
	  
        </div>
      </section>


      {/* About This Place */}
      <section className="mb-4">
<div className="backdrop-blur-sm bg-white/90 p-6 rounded-2xl border border-white/20 shadow-lg">
        <h2 className="text-xl font-semibold">About This Place</h2>
        <p className="text-gray-400 mt-1">{accommodation.description}</p>
        <p className="text-gray-600 mt-2">({accommodation.reviews || 128} reviews)</p>
 
      {/* Amenities */}
        <h2 className="text-xl font-semibold mt-2">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {accommodation.amenities.map((amenity, index) => {
            const Icon = {
              Wifi: Wifi,
              Car: Car,
              Tv: Tv,
              Coffee: Coffee,
              Bed: BedDouble,
            }[amenity] || BedDouble;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon className="w-6 h-6 text-gray-600" />
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>
</div>
      </section>


      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="p-8 rounded-2xl border bg-white shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Availability</h2>
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentMonthOffset((prev) => prev - 1)}>
                <ChevronLeft />
              </button>
              <h3>{calendar.month} {calendar.year}</h3>
              <button onClick={() => setCurrentMonthOffset((prev) => prev + 1)}>
                <ChevronRight />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center">{day}</div>
              ))}
              {calendar.days.map((day, index) => (
                <div key={index} className={`text-center ${day ? "cursor-pointer" : "invisible"}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
</section>

<div>
<button
  className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg hover:bg-blue-700 transition-all mt-4 mb-2"
  onClick={() => setIsbookingformVisible(true)}
>
  Reserve
</button>
</div>


{/* Booking Form Section */}
{isbookingformVisible && (
   <section className="mb-8 mt-4">
<div className="backdrop-blur-sm bg-white/70 p-8 rounded-2xl border border-white/20 shadow-lg">
       <div className="flex justify-between items-center px-4 py-2 border-b mb-2">
  <h2 className="text-2xl font-semibold text-gray-800">Reservation Details</h2>
  <button
              onClick={() => setIsbookingformVisible(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
</div>
  <form onSubmit={handleBookingSubmit} className="space-y-6">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
      <input
        type="text"
        name="name"
        value={bookingDetails.name}
        onChange={handleBookingChange}
        className="w-full bg-white/50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/60"
        required
      />
    </div>

    {/* Mobile Number */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">Mobile Number</label>
      <input
        type="tel"
        name="mobile"
        value={bookingDetails.mobile}
        onChange={handleBookingChange}
        className="w-full bg-white/50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/60"
        required
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
      <input
        type="email"
        name="email"
        value={bookingDetails.email}
        onChange={handleBookingChange}
        className="w-full bg-white/50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/60"
        required
      />
    </div>

    {/* Check-in */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">Check-In</label>
      <input
        type="date"
        name="checkIn"
        value={bookingDetails.checkIn}
        onChange={handleBookingChange}
        className="w-full bg-white/50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/60"
        required
      />
    </div>

    {/* Check-out */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">Check-Out</label>
      <input
        type="date"
        name="checkOut"
        value={bookingDetails.checkOut}
        onChange={handleBookingChange}
        className="w-full bg-white/50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/60"
        required
      />
    </div>

    {/* Number of Guests */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">Number of Guests</label>
      <div className="flex items-center bg-white/50 border border-gray-300 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => handleGuestChange(-1)}
          disabled={bookingDetails.guests <= 1}
          className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          -
        </button>
        <span className="flex-1 text-center text-gray-800 font-medium">{bookingDetails.guests}</span>
        <button
          type="button"
          onClick={() => handleGuestChange(1)}
          className="px-3 py-2 hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>
    </div>
{/* Special Requests */}
<div>
  <label className="block text-sm font-medium text-gray-600 mb-2">
    Special Requests
  </label>
  <div className="space-y-4">
    {/* Early Check-In */}
    <label className="flex items-center justify-between">
      <span className="text-gray-600">Early Check-In</span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name="specialRequests"
          value="Early Check-In"
          checked={bookingDetails.specialRequests.includes("Early Check-In")}
          onChange={handleSpecialRequestsChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </div>
    </label>

    {/* Extended Check-Out */}
    <label className="flex items-center justify-between">
      <span className="text-gray-600">Extended Check-Out</span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name="specialRequests"
          value="Extended Check-Out"
          checked={bookingDetails.specialRequests.includes("Extended Check-Out")}
          onChange={handleSpecialRequestsChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </div>
    </label>
  </div>
</div>

    {/* Submit Button */}
    <button
      type="submit"
      
      className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-all"
    >
      Submit Booking
    </button>
  </form>
</div>
</section>
)}
    </main>
  );
};

export default AccommodationDetails;
