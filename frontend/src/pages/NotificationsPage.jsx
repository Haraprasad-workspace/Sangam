import React ,{useState , useEffect}from "react";
import SingleNotification from "../components/SingleNotification";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotFoundPage from "./NotFoundPage";
import SangamHero from "../components/SangamHero";


const NotificationList = () => {
  const base_url = import.meta.env.VITE_API_BASE;
  const [noti, setnoti] = useState([]);
  const [loading, setloading] = useState(true)
  const [isloggedin, setisloggedin] = useState(false)
  

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
  }
};

  const notifications = async ()=>{
    try{
      let res =await  fetch(`${base_url}/getnotifications`, {
        method: "GET",
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error("some problem encountered");
      }

      const result = await res.json();
      console.log(result);
      
      setnoti(result.notifications||[]);
    }
    catch (err) {
      console.log(err);
    }finally{
      setloading(false);
    }
  }

  useEffect(() => {
    checklogin();
    notifications();
  }, [])
  if(loading){
    return <SangamHero/>
  }
  if (!isloggedin) {
    return <NotFoundPage />;
  }
  if(noti.length==0){
    return (
    <div className="bg-[url('/assets/sangam_background.jpg')] bg-no-repeat bg-cover font-oswald bg-fixed bg-center w-full min-h-screen flex flex-col p-1">
      <Navbar/>
      <div className="mb-10 mt-5 p-3 border-2 border-orange-300 bg-white  ">
      <h2 className="text-center font-bold text-sm md:text-2xl  mb-3 md:mb-5 text-orange-600">
        Notifications
      </h2>

      {/* Scrollable Notification Container */}
      <div className="flex flex-col gap-2 md:gap-3 max-h-[300px] md:max-h-[500px] overflow-y-auto pr-2  scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-100">
        <p className="md:text-2xl text-xl text-center mt-10 mb-10">No Notifications yet......</p>
      </div>
      </div>

      <Footer/>
    </div>
  );
  }
  return (
    <div className="bg-[url('/assets/sangam_background.jpg')] bg-no-repeat bg-cover font-oswald bg-fixed bg-center w-full min-h-screen flex flex-col p-1">
      <Navbar/>
      <div className="mb-10 mt-5 p-3 border-2 border-orange-300 bg-white  ">
      <h2 className="text-center font-bold text-sm md:text-2xl  mb-3 md:mb-5 text-orange-600">
        Notifications
      </h2>

      {/* Scrollable Notification Container */}
      <div className="flex flex-col gap-2 md:gap-3 max-h-[300px] md:max-h-[500px] overflow-y-auto pr-2  scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-100">
        {noti.map((n=>(
           <SingleNotification key={n._id} receiptid={n.sender._id} receiptname={n.sender.name} notification ={n} type={n.type}  postid={n.post ? n.post : null}/>
        )))}
      </div>
      </div>

      <Footer/>
    </div>
  );
};

export default NotificationList;
