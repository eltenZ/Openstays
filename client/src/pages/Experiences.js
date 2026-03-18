// src/pages/Experiences.js
import React, { useState, useEffect, useMemo } from "react";
import ExperienceCard from "../components/ExperienceCard";
import { Search } from "lucide-react";
import LoadingStatus from '../components/LoadingStatus';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("https://openstays.onrender.com/api/experiences");

        if (!response.ok) {
          throw new Error("Failed to fetch experiences.");
        }

        const data = await response.json();

        // 🔥 Normalize backend data → match your card structure
        const formatted = data.map((exp) => ({
          id: exp.id,
          title: exp.title,
          location: exp.location || "Unknown location",
          shortDescription: exp.shortDescription?.slice(0, 100) || "",
          fullDescription: exp.fullDescription || "",
          imageUrls: exp.imageUrls || [exp.image], // fallback for old API
          pricePerPerson: exp.pricePerPerson || 0,
          duration: exp.duration || "N/A",
          ageRating: exp.ageRating || "All ages",
          highlights: exp.highlights || [],
          isVerified: exp.isVerified || false,
          category: exp.category || "Experience",
        }));

        setExperiences(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // 🔍 Search Logic
  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      return (
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [experiences, searchQuery]);

  // ⏳ States
  if (loading) return <LoadingStatus />;

  if (error)
    return (
      <div className="text-center text-red-500 mt-12">{error}</div>
    );

  return (
    <main className="max-w-7xl mx-auto p-6">

      {/* 🔍 Search Bar */}
      <div className="relative mb-8 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search experiences by location or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-sm"
        />
      </div>

      {/* 📊 Results Count */}
      <div className="hidden mb-6">
        <p className="text-stone-600 font-medium">
          {filteredExperiences.length}{" "}
          {filteredExperiences.length === 1
            ? "experience"
            : "experiences"}{" "}
          found
        </p>
      </div>

      {/* 🧾 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>

      {/* ❌ Empty State */}
      {filteredExperiences.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stone-500">
            No experiences found. Try a different search.
          </p>
        </div>
      )}
    </main>
  );
};

export default Experiences;
