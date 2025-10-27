//all imports 

import { CheckLine } from "lucide-react";
import React, {useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import likeicon from "../assets/like_icon.svg"

const Like = ({ postid }) => {

  const base_url = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();
  const [checklike, setchecklike] = useState(null);
  const [likecount, setlikecount] = useState(null);
  const [checkcount, setcheckcount] = useState(0);
  const [loading, setloading] = useState(true);
   const [isSubmitting, setisSubmitting] = useState(false);

  const likethought = async () => {
    setisSubmitting(true);
    try {
      const res = await fetch(`${base_url}/likeThought/${postid}`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("could not able to like this post");
      }
      const result = await res.json();
      if(checkcount==0){
        setcheckcount(1);
      }else{
        setcheckcount(0);
      }
      console.log(result);

    } 
    catch (err) {

      alert(err);
      console.log(err);
    }finally{
      setisSubmitting(false);
    }
  };

  const likeusers=()=>{
    navigate(`/getLikes/${postid}`);
  }

  const checklikestatus=async () => {
      
    try{
      const res =  await fetch(`${base_url}/likestatus/${postid}`, {
        method:"GET",
        credentials:"include"
      })

      if(!res.ok){
        throw new Error("some error caught in the request");
      }
      let data = await res.json();
      setchecklike(data.likedbyuser);
      setlikecount(data.likecount);
    }
    catch(err){
      alert(err);
      console.log(err);
    }finally{
      setloading(false);
    }
  }

  // useEffect(() => {
  //   checklikestatus();
  // },[] ) 


  useEffect(() => {
    checklikestatus();
  },[checkcount] )   

  if(loading){
    return (
      <p className="text-orange-400 text-sm">Loading..</p>
    )
  }
  return (

    <div className="cursor-pointer rounded-full flex-col flex items-center justify-center mt-2">

      <div onClick={likethought}
        className={`w-fit p-1 rounded-full border-2 border-red-300 ${checklike ? "bg-red-300" : "bg-white" } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""} `}>
        <img className="w-7 md:w-10 " src={likeicon} />
      </div>
      <div onClick={likeusers}>
        <i className="text-xs text-zinc-400">
            {checklike?"Liked":"Like"}
        </i>
         <i className="text-xs ml-1">
        {likecount}
      </i>
      </div>
     
    </div>


  );
};

export default Like;
