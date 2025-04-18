import React from "react";

const CharacterSkeleton: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg animate-pulse">
      {/* Image skeleton */}
      <div className="h-64 bg-gray-700/50" />

      <div className="p-6 space-y-4">
        {/* Title and status skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-700/50 rounded w-3/4" />
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-gray-700/50" />
            <div className="h-4 bg-gray-700/50 rounded w-1/2" />
          </div>
        </div>

        {/* Details skeleton */}
        <div className="space-y-3">
          {["Gender", "Origin", "Location", "Episodes"].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="h-4 bg-gray-700/50 rounded w-1/4" />
              <div className="h-4 bg-gray-700/50 rounded w-2/5" />
            </div>
          ))}
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 bg-gray-700/50 rounded w-16" />
          <div className="h-8 bg-gray-700/50 rounded w-24" />
        </div>
      </div>
    </div>
  );
};

export default CharacterSkeleton;
