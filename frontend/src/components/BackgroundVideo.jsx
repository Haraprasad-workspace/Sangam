import React from "react";
import videoSrc from "../assets/bg-video.mp4";
import fallbackImg from "../assets/sangam_background.jpg";

const BackgroundVideo = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
      {/* For larger screens */}
      <video
        className="hidden sm:block w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Fallback image for small screens */}
      <img
        src={fallbackImg}
        alt="Background"
        className="block sm:hidden w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
    </div>
  );
};

export default BackgroundVideo;
