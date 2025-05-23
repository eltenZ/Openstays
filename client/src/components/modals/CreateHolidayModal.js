import React, { useState } from 'react';
import { X } from 'lucide-react';

export const CreateHolidayModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    participants: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process participants into an array
    const participantsArray = formData.participants
      .split(',')
      .map(name => name.trim())
      .filter(name => name !== '');

    onCreate({
      id: Date.now().toString(),
      ...formData,
      participants: participantsArray
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Create New Holiday</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Holiday Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Mwangi's Coastal Escape"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Plan your group trip to the Kenyan coast"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a location</option>
                  <option value="Diani Beach">Diani Beach</option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Kilifi">Kilifi</option>
                  <option value="Malindi">Malindi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="e.g. 25th July 2025"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Participants (comma separated)
              </label>
              <input
                type="text"
                name="participants"
                value={formData.participants}
                onChange={handleChange}
                placeholder="e.g. Mwangi, Amina, Juma, Karanja"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                className="flex-1 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Create Holiday
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
