// importing all the required packages and files

import React, { useState , useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThoughtForm from "../components/ThoughtForm";
import thoughts from "../assets/thoughts.json";
import NotFoundPage from "./NotFoundPage";
import SangamHero from "../components/SangamHero";

const PostThoughtPage = () => {
  const base_url = import.meta.env.VITE_API_BASE;
  const [isloggedin, setisloggedin] = useState(false);
  //variable to check wheather the user is writing their own suggestion or choosing a suggestion from the suggestion box
  const [suggestion, setsuggestion] = useState(null);
  const [randomthoughts, setrandomthoughts] = useState([]);
  const [loading, setloading] = useState(true)

  const checklogin = async () => {
  try {
    const res = await fetch(`${base_url}/checkUser`, {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json();
    setisloggedin(data.loggedIn);
  } catch (err) {
    console.log(err);
    setisloggedin(false);
  }finally{
    setloading(false);
  }
};

  useEffect(() => {
    checklogin();

    if (thoughts && thoughts.length > 1) {
      const thoughtscopy = [...thoughts];
      //randomly generating 2 index , to show 2 random thought from the thought.json()
      let index1 = Math.floor(Math.random() * thoughtscopy.length);
      let index2 = Math.floor(Math.random() * thoughtscopy.length);
      //if the index is same , then the second index wll be again get a random index
      while (index1 == index2) {
        index2 = Math.floor(Math.random() * thoughtscopy.length);
      }

      //saving the index numbers in a array
      const selectedthoughts = [thoughtscopy[index1], thoughtscopy[index2]];

      setrandomthoughts(selectedthoughts);
    }
  }, []);

  function setselectedsuggestion(thought){
    setsuggestion(thought.content);
  }

  if(loading)
    return <SangamHero/>    
  
  if (!isloggedin) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-cover bg-center bg-fixed font-oswald bg-no-repeat  bg-[url(/assets/sangam_background.jpg)] w-full  h-screen flex flex-col">
      <Navbar />

      <div className="m-auto w-full max-w-lg p-6 md:p-20 rounded-2xl mb-16 mt-6 md:mt-10 max-h-fit flex flex-col border-4 bg-slate-50 border-orange-300">
        <p className="align-top text-lg md:text-2xl font-mono font-semibold first-letter:capitalize text-center md:text-left">
          what's your thought ???
        </p>
        <ThoughtForm suggestion={suggestion}/>

        <div>
        <p className="text-xl font-bold align-middle">Suggestion Box</p>
        <i className="text-xs ">click if you like it</i>
        
        <div>
          {randomthoughts.length>0 ? (
            <ul>
              {
                randomthoughts.map((thought , index )=>{
                 return (
                   <li className="bg-gray-300 py-2 px-1  text-black mt-2 rounded-md cursor-pointer"
                   key={index} onClick={()=>{setselectedsuggestion(thought)}}>

                    <p>{thought.content}</p>
                  </li>

                  )
                })
              }
            </ul>
          ): (
            <p>Loading thoughts ..... </p>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostThoughtPage;
