import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Calendar, Users, Clock, Hotel } from "lucide-react";
import SuccessModal from "../components/SuccessModal"; // Import the SuccesModal
const TripDetails = ({addBookingItem}) => {
const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trips/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch trip details.");
        }
        const data = await response.json();
        setTrip(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-12">Loading trip details...</div>;
  if (error) return <div className="text-center text-red-500 mt-12">{error}</div>;
  if (!trip) return <div className="text-center mt-12">Trip not found.</div>;

  // Function to handle adding the trip to the reservation
  const handleAddToReservation = () => {
    const newTripItem = {
      id: trip.id,
      name: trip.title,
      location: trip.location,
      price: trip.price,
      nights: 1, // Or use any other relevant attribute
    };
    addBookingItem(newTripItem); // Call the parent's function to update bookingItems
	 // Open success modal
    setIsModalOpen(true);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="relative rounded-xl overflow-hidden mb-8">
        <img
  src={`${process.env.PUBLIC_URL}/${trip.image}`}
  alt={trip.title}
  className="w-full h-full object-fit"
/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{trip.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{trip.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{trip.dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span>{trip.max_guests} travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>{trip.duration}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Trip Description</h2>
            <p>{trip.description}</p>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 rounded-xl sticky top-6">
            <div className="text-2xl font-bold mb-4">Kes {trip.price}</div>
            <div className="text-sm text-gray-600 mb-6">per person</div>
            <button 
onClick={handleAddToReservation}
 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
              <Hotel className="w-5 h-5" />
              Add to Accommodation
            </button>

{/* Success Modal */}
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    
          </div>
        </div>
      </div>
    </main>
  );
};

export default TripDetails;
