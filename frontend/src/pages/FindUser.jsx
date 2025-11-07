//all the import statement

import React , {useState , useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Profilecard from '../components/Profilecard';
import SangamHero from '../components/SangamHero';

//main react rendering

const FindUser = () => {
 
    
  const base_url = import.meta.env.VITE_API_BASE;


  //state variables
  const [userList, setuserList] = useState([]);
  const [loading, setLoading] = useState(true);

  //route to get the list of users on the webiste 
  const getusers=async()=>{
    try{
      let res = await fetch(`${base_url}/getusers` , {
      method:"GET",
      credentials:"include"
    })

    if(!res.ok){
      throw new Error("could not able to fetch users");
    }

    let result = await res.json();
    console.log(result);
    setuserList(result.users);
    console.log(userList);


  }catch(err){
      console.log(err);
    }finally{
        setLoading(false);
    }
}

  useEffect(() => {
    getusers();
  }, [])
  
  //if the page is loading , then show the loading page 
  if(loading){
    return <SangamHero/>
  }

  //if no users are on the webiste then show this block 
  
  if(userList.length==0){
    return (

    <div className="bg-cover bg-center bg-fixed font-oswald bg-no-repeat  bg-[url(/assets/sangam_background.jpg)] w-full  h-screen flex flex-col">
      <Navbar />
      <div className="mb-10 mt-5 p-3 border-2 border-orange-300 bg-white  ">
      <h2 className="text-center font-bold text-xl md:text-2xl  mb-3 md:mb-5 text-orange-600">
        Connect with More users
      </h2>
      <div className="flex flex-col w-auto mt-14 mb-14 md:w-[700px] m-auto  overflow-y-auto ]">
       <p>No users yet.....</p>
      </div>
      
      </div>
      
      <Footer />
    </div>
  )
  }

  return (

    <div className="bg-cover bg-center bg-fixed font-oswald bg-no-repeat  bg-[url(./src/assets/sangam_background.jpg)] w-full  min-h-screen flex flex-col">
      <Navbar />
      <div className="mb-10 mt-5 p-3 border-2 border-orange-300 bg-white  ">
      <h2 className="text-center font-bold text-xl md:text-2xl  mb-3 md:mb-5 text-orange-600">
        Connect with More users
      </h2>
      <div className="flex flex-col w-auto mt-14 mb-14 md:w-[700px] m-auto  overflow-y-auto ]">
        {userList.map((profile) => (
          <Profilecard key={profile._id} receiptid={profile._id} />
        ))}
      </div>
      
      </div>
      <Footer />
    </div>
  )
}


export default FindUser