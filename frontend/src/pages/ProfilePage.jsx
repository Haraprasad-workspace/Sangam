// all imports

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ThoughtCard from "../components/ThoughtCard";
import SangamHero from "../components/SangamHero";
import Footer from "../components/Footer";
import NotFoundPage from "./NotFoundPage";
import { useNavigate } from "react-router-dom";
import DeletePost from "../components/DeletePost";

const ProfilePage = () => {
  const base_url = import.meta.env.VITE_API_BASE;
  const [profile, setprofile] = useState([]);
  const [feeds, setfeeds] = useState([]);
  const [loading, setloading] = useState(true);
  const [isloggedin, setisloggedin] = useState(false);
  const [followersdetail, setfollowersdetail] = useState([]);
  const navigate = useNavigate();

  // function to get the profile details of the logged in user

  const getProfile = async () => {
    try {
      //fetch api to call the route getprofile in the backend

      const res = await fetch(`${base_url}/getProfile`, {
        method: "GET",
        credentials: "include",
      });

      //if res is ok then its ok or else raise a error

      if (!res.ok) {
        throw new Error("profile could not be fetched ");
      }

      //save the json response in the varibale data

      const data = await res.json();
      setprofile(data);

      setisloggedin(true);

      // to get the profile feed using fetch api to call the route profilefeed with passing id of the document to identify the logged in user

      const profilefeed = await fetch(`${base_url}/profilefeed/${data._id}`, {
        method: "GET",
        credentials: "include",
      });
      const feeds = await profilefeed.json();
      setfeeds(feeds.posts);

      const countfollowers = await fetch(
        `${base_url}/countfollowers/${data._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      //if res is ok then its ok or else raise a error

      if (!countfollowers.ok) {
        throw new Error("profile could not be fetched ");
      }

      //save the json response in the varibale data

      const followerdata = await countfollowers.json();
      setfollowersdetail(followerdata);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  const followers = () => {
    navigate(`/getfollowers/${profile._id}`);
  };

  const followings = () => {
    navigate(`/getfollowings/${profile._id}`);
  };

  //use effect must be run on each render of the page (every time page refereshes)

  useEffect(() => {
    getProfile();
  }, []);

  //loading spinner mechanism

  if (loading) {
    return <SangamHero />;
  }

  //if the user is not logged in the must be not been shown

  if (!isloggedin) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-cover bg-center bg-fixed font-oswald bg-no-repeat  bg-[url(/assets/sangam_background.jpg)] w-full  min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Profile Section */}
      <div className="mt-6 md:mt-10 border-2 px-4 py-4 md:px-6 md:py-6  flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-start bg-white/70 rounded-md mx-3 md:mx-10">
        {/* Profile Picture */}
        <div className="profile flex justify-center md:justify-start w-full md:w-auto">
          <img
            src={profile.avatarurl}
            className="w-20 md:w-44 h-20 md:h-44 rounded-full object-cover"
          />
        </div>

        {/* Personal Details */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full md:w-auto items-start">
          {/* Personal Info */}
          <div className="flex flex-col gap-4 md:gap-6 w-full md:w-auto">
            <p className="text-lg md:text-2xl font-brand font-bold text-center md:text-left">
              Personal Details
            </p>
            <div className="p-3 md:p-5 border-2 md:border-4 border-yellow-200 text-xs md:text-lg leading-relaxed bg-white/80 rounded-lg flex flex-col gap-2">
              <p>
                <span className="font-bold">Username :- </span>
                {profile?.username}
              </p>
              <p>
                <span className="font-bold">Name :- </span>
                {profile?.name}
              </p>
              <p>
                <span className="font-bold">Email :- </span>
                {profile?.email}
              </p>
            </div>
          </div>

          {/* Followers & Following */}
          <div className="flex flex-row md:flex-col gap-4 md:gap-6 items-center md:items-start justify-center w-full md:w-auto">
            <div
              className="flex flex-col items-center md:items-start"
              onClick={followers}
            >
              <p className="text-xs md:text-xl font-brand font-bold text-center md:text-left">
                Followers
              </p>
              <p className="text-sm md:text-lg font-semibold text-center md:text-left">
                {followersdetail?.followers}
              </p>
            </div>
            <div
              className="flex flex-col items-center md:items-start"
              onClick={followings}
            >
              <p className="text-xs md:text-xl font-brand font-bold text-center md:text-left">
                Following
              </p>
              <p className="text-sm md:text-lg font-semibold text-center md:text-left">
                {followersdetail?.following}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center md:justify-end w-full md:w-auto mt-3 md:mt-0">
          <a href="/editprofile">
            <button className="bg-blue-200 text-xs md:text-sm font-bold border-2 p-2 md:px-4 md:py-2 rounded-md">
              Edit profile
            </button>
          </a>
        </div>
      </div>

      {/* Connect With Others Section */}
      <div className="border-2 md:border-4 border-orange-200 shadow-md w-full md:w-11/12 lg:w-4/5 m-auto p-3 md:p-5 flex flex-col items-center bg-white/70 rounded-md mt-6">
        <button
          onClick={() => navigate("/findusers")}
          className="bg-orange-300 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-md text-sm md:text-base transition"
        >
          Connect with Others
        </button>
      </div>

      {/* Posts Section */}
      <div className="border-2 md:border-4 border-zinc-400 shadow-md w-full md:w-11/12 lg:w-4/5 m-auto p-3 md:p-5 flex flex-col bg-white/70 rounded-md mt-4 mb-8">
        <p className="text-base md:text-2xl font-mono font-bold text-center my-2">
          All posts
        </p>

        {/* Posts Grid */}
        <div className="posts grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 justify-center">
          {feeds.map((feed) => (
            <div key={feed._id} className="flex flex-col p-2 items-center border-2   border-orange-500">
              <ThoughtCard content={feed.content} id={feed._id} />
              <DeletePost postid={feed._id} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
