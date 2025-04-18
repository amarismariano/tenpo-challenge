import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className="flex flex-col items-center justify-between mb-8 space-y-4 sm:flex-row sm:space-y-0"
      role="banner"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src="https://rickandmortyapi.com/icons/icon-512x512.png"
            alt="Rick and Morty Logo"
            className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
        </div>
        <h1
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
          aria-label="Rick and Morty Explorer"
        >
          Rick and Morty Explorer
        </h1>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 font-bold text-white transition-all duration-200 bg-red-500 rounded-lg hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Logout from application"
      >
        Logout
      </button>
    </header>
  );
};

export default React.memo(Header);
