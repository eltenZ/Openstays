import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PicnicDetails = () => {
  const { id } = useParams();
  const [picnic, setPicnic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPicnicDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/picnics/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch picnic details.");
        }
        const data = await response.json();
        setPicnic(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPicnicDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!picnic) return <div>No picnic found.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <img
          src={`${process.env.PUBLIC_URL}/${picnic.image}`}
          alt={picnic.title}
          className="w-full h-[300px] object-cover rounded-lg"
        />
        <div className="absolute top-4 left-4 bg-black/40 text-white px-3 py-1 rounded-md">
          <p>Verified</p>
        </div>
      </div>
      <div className="mt-6">
        <h1 className="text-3xl font-bold">{picnic.title}</h1>
        <p className="text-gray-600 mt-2">{picnic.description}</p>
        <p className="text-gray-800 font-semibold mt-4">
          Price: KES {picnic.price}
        </p>
        <p className="text-gray-600 mt-2">
          Duration: {picnic.duration} hours
        </p>
      </div>
      <button className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
        Book Now
      </button>
    </div>
  );
};

export default PicnicDetails;
