import React, { useState, useEffect } from 'react';

const PriceSlider = ({ min, max, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1000);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1000);
    setMaxValue(value);
  };

  // Notify the parent component whenever the values change.
  useEffect(() => {
    if (onChange) {
      onChange(minValue, maxValue);
    }
  }, [minValue, maxValue, onChange]);

  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="relative h-2 mb-6">
        <div className="absolute w-full h-1 bg-gray-200 rounded top-1/2 transform -translate-y-1/2"></div>
        <div
          className="absolute h-1 bg-gray-800 rounded top-1/2 transform -translate-y-1/2"
          style={{
            left: `${minPercentage}%`,
            right: `${100 - maxPercentage}%`,
          }}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto cursor-pointer"
        />
        <div
          className="absolute w-4 h-4 bg-gray-800 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          style={{ left: `${minPercentage}%` }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-gray-800 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          style={{ left: `${maxPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm text-gray-600">KES {minValue.toLocaleString()}</div>
        <div className="text-sm text-gray-600">KES {maxValue.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default PriceSlider;
