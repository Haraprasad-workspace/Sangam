import React , {useEffect , useState} from 'react'
import SangamHero from '../components/SangamHero';
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const base_url = import.meta.env.VITE_API_BASE;
  const Navigate = useNavigate();
  const [isloggedout, setisloggedout] = useState(false);
  const [loading, setloading] = useState(true);

  const logout= async()=>{
    try{
      const logout = await  fetch(`${base_url}/logout` , {
      method:"POST",
      credentials: "include",
    })
    if(!logout.ok){
      throw new Error("could not logout properly ");
    }


    setisloggedout(true);


    const data = await logout.json();
    console.log(data);
    }catch(err){
      console.log(err);
    }finally{
      setloading(false);
    }
  }

  useEffect(() => {
      logout();
    }, [])

  useEffect(() => {
    if(isloggedout){
          alert("succesfully logged out ");
          Navigate('/');
  }
  
  }, [isloggedout , Navigate])

   if(loading){
    return(
      <SangamHero/>
    )
  }
  

  
  return null
}

export default Logout