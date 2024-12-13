import React, { useState } from 'react';
import axios from 'axios';
import './AddAccommodation.css';

const AddAccommodation = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_per_night: '',
    location: '',
    city: '',
    country: '',
    max_guests: '', 
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append required fields
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
        title: '',
        description: '',
        price_per_night: '',
        location: '',
        city: '',
        country: '',
        max_guests: '', 
      });
      setImages([]);
    } catch (error) {
      console.error('Error adding accommodation:', error);
      alert('Failed to add accommodation. Please try again later.');
    }
  };

  return (
    <div className="add-accommodation-page">
      <h2>Add Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />

        <label>Description:</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required
        ></textarea>

        <label>Price per Night:</label>
        <input 
          type="number" 
          name="price_per_night" 
          value={formData.price_per_night} 
          onChange={handleChange} 
          required 
        />

        <label>Location:</label>
        <input 
          type="text" 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          required 
        />

        <label>City:</label>
        <input 
          type="text" 
          name="city" 
          value={formData.city} 
          onChange={handleChange} 
          required 
        />

        <label>Country:</label>
        <input 
          type="text" 
          name="country" 
          value={formData.country} 
          onChange={handleChange} 
          required 
        />

        <label>Max Guests:</label>
        <input 
          type="number" 
          name="max_guests" 
          value={formData.max_guests} 
          onChange={handleChange} 
          required 
        />

        {/* Add other optional fields here */}

        <label>Images:</label>
        <input 
          type="file" 
          name="images" 
          accept="image/*" 
          multiple 
          onChange={handleFileChange} 
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddAccommodation;

