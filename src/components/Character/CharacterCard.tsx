import React, { useState } from "react";
import { Character } from "../../types/character";
import CharacterModal from "./CharacterModal";

interface CharacterCardProps {
  character: Character;
}

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "alive":
      return "bg-green-500";
    case "dead":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusGlow = (status: string): string => {
  switch (status.toLowerCase()) {
    case "alive":
      return "shadow-green-500/50";
    case "dead":
      return "shadow-red-500/50";
    default:
      return "shadow-gray-500/50";
  }
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const statusColor = getStatusColor(character.status);
  const statusGlow = getStatusGlow(character.status);

  return (
    <>
      <div
        className="group bg-[#0a0620] rounded-xl overflow-hidden border border-indigo-500/30 transition-all duration-300 hover:shadow-xl relative"
        data-testid="character-card"
      >
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="object-cover w-full h-48"
            data-testid="character-image"
          />
        </div>

        <div className="p-4">
          <h3
            className="mb-2 text-xl font-bold text-white truncate transition-all duration-300 origin-left group-hover:text-green-400 group-hover:scale-105"
            data-testid="character-name"
          >
            {character.name}
          </h3>

          <div className="space-y-2">
            <p
              className="flex items-center gap-2 text-sm"
              data-testid="character-status"
            >
              <span
                className={`w-2 h-2 rounded-full ${statusColor} animate-[pulse_0.5s_ease-in-out_infinite] shadow-lg ${statusGlow}`}
              ></span>
              <span className="text-gray-100">
                {character.status} - {character.species}
              </span>
            </p>

            <div className="text-sm">
              <span className="text-gray-400">Last known location:</span>
              <p
                className="text-gray-100 truncate"
                data-testid="character-location"
              >
                {character.location.name}
              </p>
            </div>

            <div className="text-sm">
              <span className="text-gray-400">Origin:</span>
              <p
                className="text-gray-100 truncate"
                data-testid="character-origin"
              >
                {character.origin.name}
              </p>
            </div>

            <div className="text-sm">
              <span className="text-gray-400">Episodes:</span>
              <p className="text-gray-100" data-testid="character-episodes">
                {character.episode.length}
              </p>
            </div>

            <div className="text-sm">
              <span className="text-gray-400">Species:</span>
              <p className="text-gray-100" data-testid="character-species">
                {character.species}
              </p>
            </div>

            <div className="text-sm">
              <span className="text-gray-400">Gender:</span>
              <p className="text-gray-100" data-testid="character-gender">
                {character.gender}
              </p>
            </div>
          </div>

          <div className="mt-4 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full px-4 py-2 font-medium text-white transition-all transform rounded-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 active:scale-95 md:hover:scale-105"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <CharacterModal
        character={character}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CharacterCard;
