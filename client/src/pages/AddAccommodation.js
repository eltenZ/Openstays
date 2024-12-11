import React, { useState } from 'react';
import axios from 'axios';

import './AddAccommodation.css';

const AddAccommodation = () => {
  const [formData, setFormData] = useState({
    host_id: '',
    title: '',
    description: '',
    price_per_night: '',
    location: '',
    city: '',
    country: '',
    latitude: '',
    longitude: '',
    bedrooms: '',
    bathrooms: '',
    max_guests: '',
    amenities: '',
    check_in_time: '',
    check_out_time: '',
    status: 'available',
    is_available: true,
  });

  const [images, setImages] = useState([]);

  // Handle text and checkbox inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append images
      Array.from(images).forEach((image) => {
        formDataToSend.append('images', image);
      });

      const response = await axios.post('http://localhost:5000/api/accommodations', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Accommodation added successfully!');
      console.log('Response:', response.data);

      // Reset form fields
      setFormData({
        host_id: '',
        title: '',
        description: '',
        price_per_night: '',
        location: '',
        city: '',
        country: '',
        latitude: '',
        longitude: '',
        bedrooms: '',
        bathrooms: '',
        max_guests: '',
        amenities: '',
        check_in_time: '',
        check_out_time: '',
        status: 'available',
        is_available: true,
      });
      setImages([]);
    } catch (error) {
      console.error('Error adding accommodation:', error);
      alert('Failed to add accommodation. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Host ID:</label>
          <input
            type="text"
            name="host_id"
            value={formData.host_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Price per Night:</label>
          <input
            type="number"
            name="price_per_night"
            value={formData.price_per_night}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            step="0.00001"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            step="0.00001"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bedrooms:</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bathrooms:</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Max Guests:</label>
          <input
            type="number"
            name="max_guests"
            value={formData.max_guests}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amenities:</label>
          <textarea
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Check-in Time:</label>
          <input
            type="time"
            name="check_in_time"
            value={formData.check_in_time}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Check-out Time:</label>
          <input
            type="time"
            name="check_out_time"
            value={formData.check_out_time}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div>
          <label>Images:</label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Add Accommodation</button>
      </form>
    </div>
  );
};

export default AddAccommodation;
