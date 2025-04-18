import React, { useEffect, useState } from "react";

const CursorFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        <div className="absolute rounded-full -inset-4 bg-gradient-to-r from-green-500 to-blue-500 opacity-20 blur-md animate-pulse"></div>
        <div className="w-8 h-8 rounded-full bg-[url('https://rickandmortyapi.com/api/character/avatar/2.jpeg')] bg-cover border-2 border-green-400 shadow-lg animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default CursorFollower;
