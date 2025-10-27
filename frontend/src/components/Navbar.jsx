import React from "react";
import { Link } from "react-router-dom";

// ✅ Import all icons properly
import homeIcon from "../assets/home_icon.svg";
import profileIcon from "../assets/profile_icon.svg";
import logoutIcon from "../assets/logout_icon.svg";
import writeIcon from "../assets/write_icon.svg";
import notificationIcon from "../assets/notification_bell_icon.svg";

const Navbar = () => {
  return (
    <div className="font-oswald">
      {/* Desktop Navbar (Top) */}
      <div className="hidden md:flex flex-row gap-5 justify-between font-mono font-bold text-zinc-700 text-xs items-center px-3 py-2 sticky top-0 m-2 border-4 border-orange-300 rounded-md shadow-md bg-white z-50">
        <div className="rounded-full border-4 border-zinc-200 p-2">
          <Link to="/home">
            <img className="w-4 md:w-7" src={homeIcon} alt="Home" />
          </Link>
        </div>
        <div className="rounded-full border-4 border-zinc-200 p-2">
          <Link to="/postThought">
            <img className="w-12 md:w-10" src={writeIcon} alt="Write" />
          </Link>
        </div>
        <div className="rounded-full border-4 border-zinc-200 p-2">
          <Link to="/logout">
            <img className="w-4 md:w-7" src={logoutIcon} alt="Logout" />
          </Link>
        </div>
        <div className="rounded-full border-4 border-red-500 p-2">
          <Link to="/notification">
            <img className="w-4 md:w-7" src={notificationIcon} alt="Notification" />
          </Link>
        </div>
        <div className="rounded-full border-4 border-zinc-200 p-2">
          <Link to="/profile">
            <img className="w-4 md:w-7" src={profileIcon} alt="Profile" />
          </Link>
        </div>
      </div>

      {/* Mobile Navbar (Bottom Sticky) */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-orange-300 shadow-md justify-around items-center z-50">
        <div className="rounded-full border-4 border-white p-2">
        <Link to="/home">
          <img className="w-6" src={homeIcon} alt="Home" />
        </Link>
      </div>
        <div className="rounded-full border-4 border-white p-2">
          <Link to="/postThought">
            <img className="w-6" src={writeIcon} alt="Write" />
          </Link>
        </div>
        <div className="rounded-full border-4 border-white p-2">
        <Link to="/logout">
          <img className="w-6" src={logoutIcon} alt="Logout" />
        </Link>
        </div>
        <div className="rounded-full border-4 border-white p-2">
        <Link to="/notification">
          <img className="w-6" src={notificationIcon} alt="Notification" />
        </Link>
        </div>
        <div className="rounded-full border-4 border-white p-2">
        <Link to="/profile">
          <img className="w-6" src={profileIcon} alt="Profile" />
        </Link>
        </div>
    </div>

    </div>
  );
};

export default Navbar;
