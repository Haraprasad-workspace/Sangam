import React, { useState } from "react";
import delete_icon from "../assets/delete_icon.svg";
import { useNavigate } from "react-router";

const DeletePost = ({postid}) => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_BASE;
  const [deleting, setdeleting] = useState(false);


  const deletepost = async () => {
    setdeleting(true);
    try {
      let res = await fetch(`${base_url}/deletepost/${postid}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("some error caught while deleting the post");
      }

      alert("your post has been succesfully deleted");

      navigate('/home');
    } catch (err) {
      console.log(err);
    }finally{
        setdeleting(true);
        
    }
  };

    return (
  
      <div className="cursor-pointer rounded-full flex-col flex items-center justify-center mt-2">
  
        <div onClick={deletepost}
          className={`w-fit p-1 rounded-full border-2 border-red-300  ${deleting ? "opacity-50 cursor-not-allowed" : ""} `}>
          <img className="w-4 md:w-6 " src={delete_icon} />
        </div>

      </div>
  
  
    );
  
};

export default DeletePost;
