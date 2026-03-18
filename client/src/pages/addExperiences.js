import React, { useState, useEffect } from "react";

export default function AddExperiences() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    shortDescription: "",
    fullDescription: "",
    pricePerPerson: "",
    duration: "",
    ageRating: "",
    category: "",
    isVerified: false,
    highlights: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file uploads + previews
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove image
  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newFiles = formData.images.filter((_, i) => i !== index);

    setImagePreviews(newPreviews);
    setFormData((prev) => ({
      ...prev,
      images: newFiles,
    }));
  };

  // Cleanup memory
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((file) => {
            data.append("images", file);
          });
        } else if (key === "highlights") {
          data.append(
            "highlights",
            JSON.stringify(
              formData.highlights
                .split(",")
                .map((h) => h.trim())
                .filter(Boolean)
            )
          );
        } else {
          data.append(key, formData[key]);
        }
      });

      const res = await fetch("http://localhost:5000/api/experiences", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add experience.");

      const result = await res.json();

      alert("✅ Experience added successfully!");

      // Reset form
      setFormData({
        title: "",
        location: "",
        shortDescription: "",
        fullDescription: "",
        pricePerPerson: "",
        duration: "",
        ageRating: "",
        category: "",
        isVerified: false,
        highlights: "",
        images: [],
      });

      setImagePreviews([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 border">
        <h2 className="text-2xl font-bold mb-6">
          Add New Experience
        </h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Experience Title"
            className="w-full border rounded-lg p-3"
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded-lg p-3"
            required
          />

          {/* Short Description */}
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            className="w-full border rounded-lg p-3"
          />

          {/* Full Description */}
          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Full Description"
            className="w-full border rounded-lg p-3"
          />

          {/* Price + Duration */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="pricePerPerson"
              value={formData.pricePerPerson}
              onChange={handleChange}
              placeholder="Price (USD)"
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (e.g. 2 hours)"
              className="border rounded-lg p-3"
            />
          </div>

          {/* Age + Category */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="ageRating"
              value={formData.ageRating}
              onChange={handleChange}
              placeholder="Age Rating"
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border rounded-lg p-3"
            />
          </div>

          {/* Highlights */}
          <input
            type="text"
            name="highlights"
            value={formData.highlights}
            onChange={handleChange}
            placeholder="Highlights (comma separated)"
            className="w-full border rounded-lg p-3"
          />

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleFiles}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Verified + Submit */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isVerified"
                checked={formData.isVerified}
                onChange={handleChange}
              />
              <span>Verified</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Experience"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
