import React, { useState } from "react";
import {
  UserIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

const HostInfo = ({
  name,
  photo,
  rating,
  joinYear,
  bio,
  languages,
  responseRate,
  style,
  work,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hosted by {name}</h2>
      <div className="flex items-start">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {photo ? (
            <img
              src={photo}
              alt={`Host ${name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "";
                e.currentTarget.parentElement?.classList.add("bg-gray-200");
                const icon = document.createElement("div");
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
                e.currentTarget.parentElement?.appendChild(icon);
              }}
            />
          ) : (
            <UserIcon className="text-gray-500 w-6 h-6" />
          )}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <div className="flex items-center">
              <StarIcon size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
            </div>
            <span className="mx-2 text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">Host since {joinYear}</span>
          </div>
          <p className="mt-2 text-gray-600">{bio}</p>

          {expanded && (
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Languages</h3>
                <p className="mt-1 text-gray-600">{languages.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Response rate</h3>
                <p className="mt-1 text-gray-600">
                  {responseRate}% within 24 hours
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Hosting style</h3>
                <p className="mt-1 text-gray-600">{style}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Work</h3>
                <p className="mt-1 text-gray-600">{work}</p>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center">
            <button
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  Show less <ChevronUpIcon size={16} className="ml-1" />
                </>
              ) : (
                <>
                  Learn more about {name}
                  <ChevronDownIcon size={16} className="ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostInfo;
