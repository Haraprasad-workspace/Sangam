import React, { useState , useEffect} from "react";

const Follow = ({ authorid }) => {
  const [isfollowing, setisfollowing] = useState(false);
  const base_url = import.meta.env.VITE_API_BASE;
  const [loading, setloading] = useState(true);
  const [isSubmitting, setisSubmitting] = useState(false);

  const followbttn = async () => {
    setisSubmitting(true);
    try { 
      let res = await fetch(`${base_url}/follow/${authorid}`, {
        method: "POST",
        credentials: "include",
      });
      let result = await res.json();
      setisfollowing(result.isfollow);
       console.log(result);
    } catch (err) {
      console.log(err);
    }finally{
      setisSubmitting(false);
    }
  };

  const checkfollow = async()=>{
    try {
      let res = await fetch(`${base_url}/checkfollow/${authorid}`, {
        method: "GET",
        credentials: "include",
      });

      let result = await res.json();
      setisfollowing(result.isfollow);
     
    } catch (err) {
      console.log(err);
    }finally{
      setloading(false);
    }
  }

  useEffect(() => {
    checkfollow() ;
  }, [])

  if(isfollowing==-1){
    return null;
  }
  if(loading){
    return (
      <p className="text-orange-400 text-sm">Loading...</p>
    )
  }
  else{
    return (
    <div onClick={followbttn}>
      <button className={`bg-blue-300 px-2 py-1 md:ml-2 ml-1 text-xs font-bold font-mono  rounded-lg text-white border-2 border-zinc-500 ${isSubmitting? "opacity-50 cursor-not-allowed" : ""}`}>
        <i>{isfollowing==1 ? "Following" : "Follow"}</i>
      </button>
    </div>
  );
  }
  
};


export default Follow;
