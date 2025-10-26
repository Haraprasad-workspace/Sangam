import React ,{useState , useEffect} from 'react'
import Follow from './Follow'
import { useNavigate } from 'react-router';

const Profilecard = ({receiptid}) => {
    const base_url = import.meta.env.VITE_API_BASE;
    const [profiledata, setprofiledata] = useState([]);
    const navigate = useNavigate();
    const [loading, setloading] = useState(true);

    const getProfile = async () => {

    try {
      //fetch api to call the route getprofile in the backend 

      const res = await fetch(`${base_url}/profile/${receiptid}`, {
        method: "GET",
        credentials: "include",
      });

      //if res is ok then its ok or else raise a error 

      if (!res.ok) {
        throw new Error("profile could not be fetched ");
      }

      //save the json response in the varibale data 

      const data = await res.json();
      setprofiledata(data);
      console.log(profiledata);

    } catch (err) {
      console.log(err);
    }finally{
      setloading(false);
    }
  };

    const profile = ()=>{
    console.log("clicked");
    navigate(`/profile/${receiptid}`);
  }

  useEffect(() => {
    getProfile();
  }, [])
  if(loading){
    return (
    <div className="flex flex-row items-center text-xl md:text-xl  border-2 font-oswald border-back bg-white opacity-1 mt-2 mb-2 px-2 py-2 md:px-4 md:py-3 rounded-md w-full">
        <p className='text-orange-500 text-center'>Loading...</p>
      </div>
  )
  }
  return (
    <div className="flex flex-row items-center text-xl md:text-xl  border-2 font-oswald border-back bg-white opacity-1 mt-2 mb-2 px-2 py-2 md:px-4 md:py-3 rounded-md w-full">
        {/* Icon */}
        <div className="rounded-full p-1 md:p-2 flex-shrink-0">
          <img
            src={profiledata.avatarurl}
            className="w-4 h-4 md:w-6 md:h-6"
          />
        </div>

        {/* Text */}
        <div className="ml-2 md:ml-3 flex flex-col">
          <div className="text-xs md:text-lg  flex flex-row leading-snug">
            <div className="text-orange-300 mr-4" onClick={profile}>
              <span className="font-bold">{profiledata.name}</span>
            </div>
            <Follow authorid={receiptid}/>
          </div>

        </div>
      </div>
  )
}

export default Profilecard