import React, { useState } from "react";
import { Location } from "../../types/location";
import LocationResidentsModal from "./LocationResidentsModal";

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="p-6 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:border-indigo-500/30"
        data-testid="location-card"
      >
        <h3
          className="mb-2 text-xl font-bold text-white"
          data-testid="location-name"
        >
          {location.name}
        </h3>
        <div className="space-y-2 text-gray-300">
          <p data-testid="location-type">
            <span className="font-medium text-indigo-400">Type:</span>{" "}
            {location.type}
          </p>
          <p data-testid="location-dimension">
            <span className="font-medium text-indigo-400">Dimension:</span>{" "}
            {location.dimension}
          </p>
          <p data-testid="location-residents">
            <span className="font-medium text-indigo-400">Residents:</span>{" "}
            {location.residents.length}
          </p>

          {location.residents.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-4 px-4 py-2 font-medium text-white transition-all transform rounded-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 active:scale-95"
            >
              View Residents
            </button>
          )}
        </div>
      </div>

      <LocationResidentsModal
        location={location}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default LocationCard;
