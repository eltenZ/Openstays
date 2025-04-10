import React, { useState } from 'react';

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!formData.name || !formData.contact) {
      setMessage('Please enter both your name and email/phone number.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowCongrats(true);
      setMessage('Congratulations! You have joined the waiting list.');

      // Clear input fields after submission
      setFormData({
        name: '',
        contact: '',
      });
    }, 2000); // Simulated API call time
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Get Early Access</h2>
        <p className="text-gray-600 mb-6">
          Join our waiting list and receive exclusive discounts when we launch.
        </p>
        {!showCongrats ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: e.target.value,
                  })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : 'Join Waiting List'}
            </button>
            {message && <p className="text-red-500 text-sm">{message}</p>}
          </form>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};
