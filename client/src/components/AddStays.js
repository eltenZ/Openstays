import {
  Clock,
  MapPin,
  Home,
  Users,
  Bed,
  Check,
  X,
  Upload,
} from "lucide-react";
import { render } from "react-dom";
import React, { useState } from "react";
export default function AddStays() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerNight: "",
    location: "",
    city: "",
    country: "",
    latitude: "",
    longitude: "",
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    amenities: "",
    checkIn: "",
    checkOut: "",
    image_Urls: "",
    status: "pending",
    isAvailable: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.pricePerNight) newErrors.pricePerNight = "Price is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.bedrooms)
      newErrors.bedrooms = "Number of bedrooms is required";
    if (!formData.bathrooms)
      newErrors.bathrooms = "Number of bathrooms is required";
    if (!formData.maxGuests) newErrors.maxGuests = "Maximum guests is required";
    if (!formData.checkIn) newErrors.checkIn = "Check-in time is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out time is required";
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
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      pricePerNight: "",
      location: "",
      city: "",
      country: "",
      latitude: "",
      longitude: "",
      bedrooms: "",
      bathrooms: "",
      maxGuests: "",
      amenities: "",
      checkIn: "",
      checkOut: "",
      imageUrls: "",
      status: "pending",
      isAvailable: false,
    });
    setErrors({});
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 md:p-8"
        aria-label="Accommodation submission form"
      >
        <h1 className="text-2xl font-semibold mb-6">Add New Accommodation</h1>

        <div className="space-y-6">
          {/* Basic Information */}
          <section className="space-y-4">
            <h2 className="text-xl font-medium">Basic Information</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.title ? "border-red-500" : ""}`}
                  aria-invalid={errors.title ? "true" : "false"}
                  aria-describedby={errors.title ? "title-error" : undefined}
                />
                {errors.title && (
                  <p id="title-error" className="mt-1 text-sm text-red-500">
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pricePerNight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price per night *
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    id="pricePerNight"
                    name="pricePerNight"
                    min="0"
                    step="0.01"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    className={`block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.pricePerNight ? "border-red-500" : ""}`}
                    aria-invalid={errors.pricePerNight ? "true" : "false"}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.description ? "border-red-500" : ""}`}
                aria-invalid={errors.description ? "true" : "false"}
              />
            </div>
          </section>

          {/* Location Information */}
          <section className="space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location Details
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Latitude
                </label>
                <input
                  type="number"
                  id="latitude"
                  name="latitude"
                  step="any"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Longitude
                </label>
                <input
                  type="number"
                  id="longitude"
                  name="longitude"
                  step="any"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Property Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <Home className="w-5 h-5" />
              Property Details
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bedrooms *
                </label>
                <div className="relative mt-1">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    min="0"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bathrooms *
                </label>
                <div className="relative mt-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    min="0"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="maxGuests"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum Guests *
                </label>
                <div className="relative mt-1">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    id="maxGuests"
                    name="maxGuests"
                    min="1"
                    value={formData.maxGuests}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="amenities"
                className="block text-sm font-medium text-gray-700"
              >
                Amenities
              </label>
              <textarea
                id="amenities"
                name="amenities"
                rows="3"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Enter amenities separated by commas"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Check-in/out Times */}
          <section className="space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Check-in/out Times
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="checkIn"
                  className="block text-sm font-medium text-gray-700"
                >
                  Check-in Time *
                </label>
                <input
                  type="time"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="checkOut"
                  className="block text-sm font-medium text-gray-700"
                >
                  Check-out Time *
                </label>
                <input
                  type="time"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Images
            </h2>

            <div>
              <label
                htmlFor="imageUrls"
                className="block text-sm font-medium text-gray-700"
              >
                Image URLs
              </label>
              <textarea
                id="imageUrls"
                name="imageUrls"
                rows="3"
                value={formData.imageUrls}
                onChange={handleChange}
                placeholder="Enter image URLs separated by new lines"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Status and Availability */}
          <section className="space-y-4">
            <h2 className="text-xl font-medium">Status and Availability</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="flex items-center h-full pt-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Available for booking
                  </span>
                </label>
              </div>
            </div>
          </section>
        </div>

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
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
render(<AddStays />, document.getElementById("root"));
