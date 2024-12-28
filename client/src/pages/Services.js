import {
  ChefHat,
  Car,
  Navigation,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SuccessModal from "../components/SuccessModal"; // Import the SuccessModal
export default function ServicesPage({ addBookingItem }) {
const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDays, setSelectedDays] = useState(1);
  const [chefOption, setChefOption] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [guideDuration, setGuideDuration] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const addService = (type, details, price) => {
    setSelectedServices([
      ...selectedServices,
      { type, details, price, id: Date.now() },
    ]);
  };

  const removeService = (id) => {
    setSelectedServices(selectedServices.filter((service) => service.id !== id));
  };

const handleAddToReservation = () => {
  selectedServices.forEach((service) => {
    const newBooking = {
      id: service.id,
      name: service.type,
      details: service.details,
      price: service.price,
    };
    addBookingItem(newBooking); // Call parent function
	 // Open success modal
    setIsModalOpen(true);
  })
};

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1a365d] mb-8">
          Additional Services
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chef Service */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <ChefHat className="text-[#1a365d]" size={24} />
              <h2 className="text-xl font-semibold text-[#1a365d]">
                Private Chef
              </h2>
            </div>

            <div className="space-y-4">
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setChefOption(e.target.value)}
              >
                <option>Select Service</option>
                <option value="Full Day">Full Day (Kes 3,000)</option>
                <option value="Per Meal">Per Meal (Kes 1,500)</option>
              </select>

              <div className="flex items-center gap-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select Start Date"
                  className="w-full p-2 border rounded"
                />
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      setSelectedDays((days) => Math.max(days - 1, 1))
                    }
                    className="p-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="px-4">{selectedDays}</span>
                  <button
                    onClick={() => setSelectedDays((days) => days + 1)}
                    className="p-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  if (chefOption && selectedDate) {
                    const rate = chefOption === "Full Day" ? 3000 : 1500;
                    addService(
                      "Chef",
                      `${chefOption} Private Chef Service for ${selectedDays} day(s)`,
                      rate * selectedDays
                    );
                  }
                }}
                className="w-full bg-[#1a365d] text-white py-2 rounded hover:bg-[#2a466d] transition"
              >
                Add Chef Service
              </button>
            </div>
          </div>

          {/* Transfer Service */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Car className="text-[#1a365d]" size={24} />
              <h2 className="text-xl font-semibold text-[#1a365d]">
                Transfers
              </h2>
            </div>

            <div className="space-y-4">
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setPickupLocation(e.target.value)}
              >
                <option>Pickup Location</option>
                <option>Airport</option>
                <option>Hotel</option>
                <option>City Center</option>
              </select>

              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setDropoffLocation(e.target.value)}
              >
                <option>Drop-off Location</option>
                <option>Airport</option>
                <option>Hotel</option>
                <option>City Center</option>
              </select>

              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option>Vehicle Type</option>
                <option value="Sedan">Sedan (Kes 8,800)</option>
                <option value="SUV">SUV (Kes 13,200)</option>
                <option value="Van">Van (Kes 17,600)</option>
              </select>

              <button
                onClick={() => {
                  if (pickupLocation && dropoffLocation && vehicleType) {
                    const rates = { Sedan: 8800, SUV: 13200, Van: 17600 };
                    addService(
                      "Transfer",
                      `Transfer from ${pickupLocation} to ${dropoffLocation} (${vehicleType})`,
                      rates[vehicleType]
                    );
                  }
                }}
                className="w-full bg-[#1a365d] text-white py-2 rounded hover:bg-[#2a466d] transition"
              >
                Add Transfer Service
              </button>
            </div>
          </div>

          {/* Tour Guide Service */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Navigation className="text-[#1a365d]" size={24} />
              <h2 className="text-xl font-semibold text-[#1a365d]">
                Tour Guides
              </h2>
            </div>

            <div className="space-y-4">
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setSelectedGuide(e.target.value)}
              >
                <option>Select Guide</option>
                <option>Sarah (History Expert)</option>
                <option>Michael (Culture Expert)</option>
                <option>David (Adventure Guide)</option>
              </select>

              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setGuideDuration(e.target.value)}
              >
                <option>Select Duration</option>
                <option value="Half Day">Half Day (Kes 1,500)</option>
                <option value="Full Day">Full Day (Kes 3,000)</option>
              </select>

              <button
                onClick={() => {
                  if (selectedGuide && guideDuration) {
                    const rate = guideDuration === "Full Day" ? 3000 : 1500;
                    addService(
                      "Guide",
                      `${guideDuration} Tour Guide - ${selectedGuide}`,
                      rate
                    );
                  }
                }}
                className="w-full bg-[#1a365d] text-white py-2 rounded hover:bg-[#2a466d] transition"
              >
                Add Guide Service
              </button>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        {selectedServices.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#1a365d] mb-4">
              Selected Services
            </h2>

            <div className="space-y-4">
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 border rounded"
                >
                  <div>
                    <h3 className="font-medium">{service.type}</h3>
                    <p className="text-sm text-gray-600">{service.details}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      Kes {service.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeService(service.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                <span>Total</span>
                <span>
                  Kes{" "}
                  {selectedServices
                    .reduce((sum, service) => sum + service.price, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Add to Reservation Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
<button
  className="w-full bg-[#1a365d] text-white py-3 rounded-lg font-medium hover:bg-[#2a4365]"
  onClick={handleAddToReservation}
>
  Add Services to Reservation
</button>
        </div>
      </div>

{/* Success Modal */}
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
