import React ,{useState , useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Profilecard from '../components/Profilecard';
import { useParams } from "react-router-dom";


const FollowersListPage = () => {

  const base_url = import.meta.env.VITE_API_BASE;

  const [followersList, setfollowersList] = useState([]);
  const { profileid } = useParams();

  const getfollowers=async()=>{
    try{
      let res = await fetch(`${base_url}/getfollowers/${profileid}` , {
      method:"GET",
      credentials:"include"
    })

    if(!res.ok){
      throw new Error("could not able to fetch followers");
    }

    let result = await res.json();
    setfollowersList(result.profiles);
    console.log(followersList);


  }catch(err){
      console.log(err);
    }
}

  useEffect(() => {
    getfollowers();
  }, [])
  
  if(followersList.length==0){
    return (

    <div className="bg-cover bg-center bg-fixed font-oswald bg-no-repeat  bg-[url(./src/assets/sangam_background.jpg)] w-full  h-screen flex flex-col">
      <Navbar />
      <div className="mb-10 mt-5 p-3 border-2 border-orange-300 bg-white  ">
      <h2 className="text-center font-bold text-xl md:text-2xl  mb-3 md:mb-5 text-orange-600">
        Followers 
      </h2>
      <div className="flex flex-col w-auto mt-14 mb-14 md:w-[700px] m-auto  overflow-y-auto ]">
       <p>No followers.....</p>
      </div>
      
      </div>
      
       

      <Footer />
    </div>
  )
  }

  return (

    <div className="bg-cover bg-center bg-fixed font-oswald bg-no-repeat  bg-[url(./src/assets/sangam_background.jpg)] w-full  h-screen flex flex-col">
      <Navbar />
      <div className="mb-10 mt-5 p-3 border-2 border-orange-300 bg-white  ">
      <h2 className="text-center font-bold text-xl md:text-2xl  mb-3 md:mb-5 text-orange-600">
        Followers 
      </h2>
      <div className="flex flex-col w-auto mt-14 mb-14 md:w-[700px] m-auto  overflow-y-auto ]">
        {followersList.map((profile) => (
          <Profilecard key={profile._id} receiptid={profile.follower} />
        ))}
      </div>
      
      </div>
      
      

      <Footer />
    </div>
  )
}

export default FollowersListPage