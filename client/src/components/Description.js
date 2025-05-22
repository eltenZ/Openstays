// src/components/Description.jsx
import React from 'react';
import { CheckIcon } from 'lucide-react';

const Description = ({ description, highlights = [] }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">About this space</h2>
    <p className="text-gray-600 mb-6">{description}</p>

    {highlights.length > 0 && (
      <>
        <h3 className="font-medium mb-3">Highlights</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
          {highlights.map((item, i) => (
            <li key={i} className="flex items-start">
              <CheckIcon size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
);

export default Description;
