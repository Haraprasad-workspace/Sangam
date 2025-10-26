import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SingleNotification from "../components/SingleNotification";
import SingleFeed from "../components/SingleFeed";
import SangamHero from "../components/SangamHero";
import NotFoundPage from "./NotFoundPage";

const HomePage = () => {
  const base_url = import.meta.env.VITE_API_BASE;
  const [feeds, setfeeds] = useState([]);
  const [loading, setloading] = useState(true)
  const [isloggedin, setisloggedin] = useState(false);

  const checklogin = async () => {
  try {
    const res = await fetch(`${base_url}/checkUser `, {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json();
    setisloggedin(data.loggedIn);
  } catch (err) {
    console.log(err);
    setisloggedin(false);
  }
};

  const loadfeed = async () => {
    try {
      const res = await fetch(`${base_url}/loadfeed`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error("some problem encountered");
      }
      setfeeds(result);

    } catch (err) {
      console.log(err);
    }finally{
      setloading(false);
    }
  };

  useEffect(() => {
    checklogin(); 
    loadfeed();
  }, []);
  
  if(loading){
    return(
      <SangamHero/>
    )
  }

  if(!isloggedin){
    return <NotFoundPage/>
  }
  
  if(feeds.length==0){
    return (
    <div className="bg-cover bg-center bg-fixed font-oswald bg-no-repeat  bg-[url(./src/assets/sangam_background.jpg)] w-full  h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col overflow-y-auto">
        <p className="md:text-2xl text-xl text-center mt-10 mb-10 ">No Post Yet...</p>
        <Footer />
      </div>
    </div>
  );
  }
  return (
    <div className="bg-cover bg-center bg-fixed font-oswald bg-no-repeat  bg-[url(./src/assets/sangam_background.jpg)] w-full  h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col overflow-y-auto">
        {feeds.map((feed) => (
          <SingleFeed key={feed._id} postid={feed._id} post ={feed} author={feed.author} content={feed.content} />
        ))}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
