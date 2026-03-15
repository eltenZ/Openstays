// AddStays.js
import React, { useState } from 'react';
import axios from 'axios';

const AddStays = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Kenya');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [amenities, setAmenities] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [status, setStatus] = useState('available');
  const [isAvailable, setIsAvailable] = useState(true);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle image selection and previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !pricePerNight || !location || images.length === 0) {
      setMessage('Please fill all required fields and select at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price_per_night', pricePerNight);
    formData.append('location', location);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('max_guests', maxGuests);
    formData.append('amenities', amenities);
    formData.append('check_in_time', checkInTime);
    formData.append('check_out_time', checkOutTime);
    formData.append('status', status);
    formData.append('is_available', isAvailable);

    images.forEach(img => formData.append('images', img));

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/accommodations', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`Accommodation added: ${res.data.title}`);
      // Reset form
      setTitle('');
      setDescription('');
      setPricePerNight('');
      setLocation('');
      setCity('');
      setCountry('Kenya');
      setBedrooms('');
      setBathrooms('');
      setMaxGuests('');
      setAmenities('');
      setCheckInTime('');
      setCheckOutTime('');
      setStatus('available');
      setIsAvailable(true);
      setImages([]);
      setImagePreviews([]);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add accommodation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Add New Accommodation</h2>

      {message && <p className="mb-4 text-red-600 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto">
        <input
          type="text"
          placeholder="Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Description*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          required
        />
        <input
          type="number"
          placeholder="Price per night*"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Location*"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Max guests"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Amenities (comma separated)"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="time"
            placeholder="Check-in time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="time"
            placeholder="Check-out time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />

        {/* Image previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx + 1}`}
                className="w-full h-24 object-cover rounded-md"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Uploading...' : 'Add Accommodation'}
        </button>
      </form>
    </div>
  );
};

export default AddStays;
