import React from "react";

const SangamHero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-300 text-white text-center px-4">
      {/* Circular Spinner */}
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Loading text */}
      <p className="text-lg font-medium mb-4">Loading...</p>

      {/* Platform name */}
      <h1 className="text-3xl sm:text-4xl text-orange-500 font-bold mb-2">Sangam</h1>
      <p className="text-sm sm:text-base mb-6">A Thought Sharing Platform</p>

      {/* Developer credit */}
      <p className="text-xs sm:text-sm opacity-80">
        Designed and developed by <span className="text-black font-semibold">Haraprasad</span>
      </p>
    </div>
  );
};

export default SangamHero;
