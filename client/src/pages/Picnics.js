import React, { useState, useEffect } from "react";
import PicnicCard from "../components/PicnicCard";
import { Search } from "lucide-react";
const Picnics = () => {
  const [picnics, setPicnics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPicnics = async () => {
      try {
        const response = await fetch("http://192.168.24.100:5000/api/picnics");
        if (!response.ok) {
          throw new Error("Failed to fetch picnics.");
        }
        const data = await response.json();
        setPicnics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPicnics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
	{/* Search Bar */}
<div className="relative mt-4 mb-8 container mx-auto">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Explore Picnics"
      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {picnics.map((picnic) => (
          <PicnicCard key={picnic.id} picnic={picnic} />
        ))}
      </div>
    </div>
  );
};

export default Picnics;
