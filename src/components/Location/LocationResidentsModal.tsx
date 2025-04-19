import React from "react";
import { Location } from "../../types/location";
import CharacterCard from "../Character/CharacterCard";
import { useLocationResidents } from "../../hooks/useLocationResidents";

interface LocationResidentsModalProps {
  location: Location;
  isOpen: boolean;
  onClose: () => void;
}

const LocationResidentsModal: React.FC<LocationResidentsModalProps> = ({
  location,
  isOpen,
  onClose,
}) => {
  const { residents, isLoading, error, isSearching } = useLocationResidents(
    location,
    isOpen
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-gray-900 rounded-xl shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Residents of {location.name}
            </h2>
            {isSearching && (
              <p className="mt-1 text-sm text-gray-400">Searching...</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          {isLoading || isSearching ? (
            <div className="flex items-center justify-center p-8">
              <div
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                data-testid="loading-spinner"
                role="status"
                aria-label="Loading residents"
              />
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : residents.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No residents found in this location
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {residents.map((resident) => (
                <CharacterCard key={resident.id} character={resident} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationResidentsModal;
