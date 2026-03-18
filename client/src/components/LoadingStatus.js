import React, { useEffect, useState } from 'react';
import { LoaderIcon } from 'lucide-react';

const loadingMessages = [
  'One second...',
  'Creating adventures...',
  'Inspecting villas...',
  'Putting everything together...',
  'Refining services...',
];

const LoadingStatus = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        setIsAnimating(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-3 h-screen">
      <LoaderIcon className="w-4 h-4 animate-spin text-gray-600" />

      <span
        className={`text-gray-600 transition-all duration-500 ${
          isAnimating
            ? 'opacity-0 translate-y-1'
            : 'opacity-100 translate-y-0'
        }`}
      >
        {loadingMessages[currentMessageIndex]}
      </span>
    </div>
  );
};

export default LoadingStatus;
