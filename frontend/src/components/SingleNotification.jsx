import React , {useEffect , useState} from "react";
import Userprofile from "../pages/Userprofile";
import { useNavigate } from "react-router-dom";


const SingleNotification = ({ receiptid ,receiptname , notification , type  , postid}) => {

  const [thought, setthought] = useState();
  const base_url = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);

  const getThought = async ()=>{
    if(postid){
       try{
      let res = await fetch(`${base_url}/getThought/${postid}` , {
        method:"GET",
        credentials:"include"
      })

      let result = await res.json();
      setthought(result.thought);

    }catch(err){
      console.log(err);
    }finally{
      setloading(false);
    }
    }
   
  }

  const profile = ()=>{
    console.log("clicked");
    navigate(`/profile/${receiptid}`);
  }

  useEffect(() => {
  if (postid) {
    getThought();
  } else {
    setloading(false);
  }
}, []);

  if(loading){
    return (
      <div className="flex flex-row font-oswald items-center border-2 border-gray-300 bg-white opacity-1 mt-2 mb-2 px-2 py-2 md:px-4 md:py-3 rounded-md w-full">
        <p className="text-orange-500 text-sm">Loading....</p>
      </div>
    );
  }
  
  if (type == "like") {
    return (
      <div className="flex flex-row font-oswald items-center border-2 border-gray-300 bg-white opacity-1 mt-2 mb-2 px-2 py-2 md:px-4 md:py-3 rounded-md w-full">
        {/* Icon */}
        <div className="rounded-full p-1 md:p-2 flex-shrink-0">
          <img
            src="./src/assets/like_icon.svg"
            className="w-4 h-4 md:w-6 md:h-6"
          />
        </div>

        {/* Text */}
        <div className="ml-2 md:ml-3 flex flex-col">
          <div>
            <div className="text-xs md:text-lg flex flex-row gap-1 leading-snug">
            <div className="text-orange-300 " onClick={profile}>
              <span className="font-bold">{receiptname}</span>
            </div>
            <span> </span>
            Liked your thought
          </div>
          </div>
          <div className="mt-1 mb-1 text-xs font-bold text-zinc-600 ">
              <span><i>"{thought}"</i></span>
            </div>
          <span className="text-[10px]  md:text-sm text-gray-500">
            <i> {new Date(notification.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}</i>
          </span>
        </div>
      </div>
    );
  } 
  if (type == "follow") {
    return (
      <div className="flex flex-row items-center border-2 border-back bg-white opacity-1 mt-2 mb-2 px-2 py-2 md:px-4 md:py-3 rounded-md w-full">
        {/* Icon */}
        <div className="rounded-full p-1 md:p-2 flex-shrink-0">
          <img
            src="./src/assets/connect_icon.svg"
            className="w-4 h-4 md:w-6 md:h-6"
          />
        </div>

        {/* Text */}
        <div className="ml-2 md:ml-3 flex flex-col">
          <div className="text-xs md:text-lg gap-1 flex flex-row leading-snug">
            <div className="text-orange-300 " onClick={profile}>
              <span className="font-bold">{receiptname}</span>
            </div>
            Followed you
          </div>
          <span className="text-[10px] md:text-sm text-gray-500">
            <i>
              {new Date(notification.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}
            </i>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>some error encountered here</p>
      </div>
    );
  }
};

export default SingleNotification;
