// SuccessModal.js
import React from "react";
import { X, Check } from "lucide-react";

export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 items-end right-4 inset-0 z-50 flex justify-end p-4 bg-black/10">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-sm p-4 bg-white rounded-md shadow-xl"
      >
        {/* Content Section */}
        <div className="flex justify-between items-center">
          <div>
            <h2
              id="modal-title"
              className="mb-1 text-lg font-semibold text-gray-900"
            >
              Added reservation successfully
            </h2>
            <p className="text-sm font-semibold  text-gray-600">
              You can check your reservations on the tab.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-sm font-semibold text-blue-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
