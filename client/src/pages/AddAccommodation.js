import React, { useState } from "react";
import axios from "axios";
import { Upload, Check, MapPin, Home, Clock, Users, Bed } from "lucide-react";

const AddAccommodation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price_per_night: "",
    location: "",
    city: "",
    country: "",
    latitude: "",
    longitude: "",
    bedrooms: "",
    bathrooms: "",
    max_guests: "",
    amenities: "",
    check_in_time: "",
    check_out_time: "",
    status: "pending",
    is_available: true,
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.price_per_night) newErrors.price_per_night = "Price is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.bedrooms) newErrors.bedrooms = "Number of bedrooms is required";
    if (!formData.bathrooms) newErrors.bathrooms = "Number of bathrooms is required";
    if (!formData.max_guests) newErrors.max_guests = "Maximum guests is required";
    if (!formData.check_in_time) newErrors.check_in_time = "Check-in time is required";
    if (!formData.check_out_time) newErrors.check_out_time = "Check-out time is required";
    return newErrors;
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append images
      Array.from(images).forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await axios.post(
        "http://localhost:5000/api/accommodations",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Accommodation added successfully!");
      console.log("Response:", response.data);

      // Reset form fields
      setFormData({
        title: "",
        description: "",
        price_per_night: "",
        location: "",
        city: "",
        country: "",
        latitude: "",
        longitude: "",
        bedrooms: "",
        bathrooms: "",
        max_guests: "",
        amenities: "",
        check_in_time: "",
        check_out_time: "",
        status: "pending",
        is_available: true,
      });
      setImages([]);
    } catch (error) {
      console.error("Error adding accommodation:", error);
      alert("Failed to add accommodation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Add New Accommodation</h1>
        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <section>
            <h2 className="text-xl font-medium mb-2">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                  aria-invalid={errors.title ? "true" : "false"}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="price_per_night" className="block text-sm font-medium text-gray-700">Price per Night *</label>
                <input
                  type="number"
                  id="price_per_night"
                  name="price_per_night"
                  value={formData.price_per_night}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.price_per_night ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                  aria-invalid={errors.price_per_night ? "true" : "false"}
                />
                {errors.price_per_night && <p className="text-sm text-red-500">{errors.price_per_night}</p>}
              </div>
            </div>
          </section>
{/* Location Information Section */}
          <section>
            <h2 className="text-xl font-medium mb-2">Location Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                  aria-invalid={errors.location ? "true" : "false"}
                />
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                  aria-invalid={errors.city ? "true" : "false"}
                />
                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country *</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                  aria-invalid={errors.country ? "true" : "false"}
                />
                {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
              </div>
            </div>
          </section>

          {/* Property Details Section */}
          <section>
            <h2 className="text-xl font-medium mb-2">Property Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms *</label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                  aria-invalid={errors.bedrooms ? "true" : "false"}
                />
                {errors.bedrooms && <p className="text-sm text-red-500">{errors.bedrooms}</p>}
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms *</label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                  aria-invalid={errors.bathrooms ? "true" : "false"}
                />
                {errors.bathrooms && <p className="text-sm text-red-500">{errors.bathrooms}</p>}
              </div>

              <div>
                <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700">Maximum Guests *</label>
                <input
                  type="number"
                  id="maxGuests"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.maxGuests ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                  aria-invalid={errors.maxGuests ? "true" : "false"}
                />
                {errors.maxGuests && <p className="text-sm text-red-500">{errors.maxGuests}</p>}
              </div>
            </div>
          </section>
{/* Amenities Section */}
          <section>
            <h2 className="text-xl font-medium mb-2">Amenities</h2>
            <textarea
              id="amenities"
              name="amenities"
              rows="3"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="Enter amenities separated by commas"
              className={`mt-1 block w-full p-2 border rounded-md ${errors.amenities ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {errors.amenities && <p className="text-sm text-red-500">{errors.amenities}</p>}
          </section>

          {/* Check-in and Check-out Times Section */}
          <section>
            <h2 className="text-xl font-medium mb-2">Check-in/out Times</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in Time *</label>
                <input
                  type="time"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.checkIn ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                />
                {errors.checkIn && <p className="text-sm text-red-500">{errors.checkIn}</p>}
              </div>

              <div>
                <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out Time *</label>
                <input
                  type="time"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.checkOut ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                />
                {errors.checkOut && <p className="text-sm text-red-500">{errors.checkOut}</p>}
              </div>
            </div>
          </section>

          {/* Images Section */}
          <section>
            <h2 className="text-xl font-medium mb-2">Images</h2>
            <input
              type="file"
              id="imageUrls"
              name="imageUrls"
              accept="image/*"
              multiple
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.imageUrls ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
            />
            {errors.imageUrls && <p className="text-sm text-red-500">{errors.imageUrls}</p>}
          </section>

          {/* Status and Availability Section */}
          <section>
            <h2 className="text-xl font-medium mb-2">Status and Availability</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
                {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
              </div>

              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">Available for booking</span>
                </label>
              </div>
            </div>
          </section>

          {/* Submit Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
	</form>
      </form>
    </main>
  );
}

render(<AccommodationForm />, document.getElementById("root"));
