import React from "react";
import { Character } from "../../types/character";

interface CharacterModalProps {
  character: Character;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className="flex min-h-full items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="character-modal-title"
      >
        <div className="relative transform overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 text-left shadow-xl transition-all w-full max-w-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:w-1/2 space-y-6">
              <div>
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  id="character-modal-title"
                >
                  {character.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      character.status.toLowerCase() === "alive"
                        ? "bg-green-500"
                        : character.status.toLowerCase() === "dead"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <span className="text-lg text-gray-300">
                    {character.status} - {character.species}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Gender</p>
                  <p className="text-white font-medium">{character.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Species</p>
                  <p className="text-white font-medium">{character.species}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Origin</p>
                  <p className="text-white font-medium">
                    {character.origin.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">
                    {character.location.name}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Episodes</p>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white font-medium">
                    Appears in {character.episode.length} episodes
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {character.episode
                      .slice(0, 5)
                      .map((ep: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                        >
                          #{ep.split("/").pop()}
                        </span>
                      ))}
                    {character.episode.length > 5 && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        +{character.episode.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
