// src/pages/Trips.js
import React, { useState, useEffect } from "react";
import TripCard from "../components/TripCard";
import { Search } from "lucide-react";
const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/trips");
        if (!response.ok) {
          throw new Error("Failed to fetch trips.");
        }
        const data = await response.json();
        setTrips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <div className="text-center mt-12">Loading trips...</div>;
  if (error) return <div className="text-center text-red-500 mt-12">{error}</div>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Search Bar */}
<div className="relative mt-4 mb-8 container mx-auto">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Explore trips"
      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            id={trip.id}
            title={trip.title}
            description={trip.description}
            image={trip.image}
            price={trip.price}
          />
        ))}
      </div>
    </main>
  );
};

export default Trips;
