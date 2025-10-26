import React,{useState , useEffect} from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import screenshot1 from '../assets/screenshot1.png';
import screenshot2 from '../assets/screenshot2.png';
import screenshot3 from '../assets/screenshot3.png';
import SangamHero from '../components/SangamHero';

import bg-video from "../assets/bg-video.mp4";
import bg-image from '../assets/sangam_background.jpg';

const Dashboard = () => {
  const [loading, setloading] = useState(true);
  const features = [
    {
      title: "Discover Thoughts",
      description: "Browse ideas and thoughts from people around you. Like, follow, and engage easily.",
      img: screenshot1,
    },
    {
      title: "Share Your Thoughts",
      description: "Post your own ideas and let the community interact with them.",
      img: screenshot2,
    },
    {
      title: "Manage Your Profile",
      description: "Keep track of followers, following, and your posts all in one place.",
      img: screenshot3,
    },
  ];

  useEffect(() => {
    setloading(false);
  
  }, [loading]);

  if(loading){
    return <SangamHero/>
  }
  

  return (
    <div className="relative w-full min-h-screen md:h-screen font-oswald flex flex-col">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover opacity-50 -z-10"
  >
    <source src="/src/assets/bg-video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>


  {/* Hero Section */}
  <div  className="flex flex-col gap-2 md:gap-12 text-center mt-5 md:mt-14 justify-center md:h-screen  items-stretch px-4 md:px-20 mb-20">
    <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-bounce">
      Welcome to Sangam
    </h1>
    <p className="text-lg md:text-2xl mb-10 animate-fadeIn delay-200">
      Connect, share, and explore thoughts with the community.
    </p>
  </div>

  {/* Features Section */}
  <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center h-auto w-auto items-stretch px-4 md:px-20 mb-10">
    {features.map((feature, index) => (
      <div
        key={index}
        className="flex flex-col bg-transparent
         rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer animate-slideIn flex-1"
        style={{ animationDelay: `${index * 200}ms` }}
      >
        <div className="w-full relative">
          <img
            src={feature.img}
            alt={feature.title}
            className="w-50 m-auto h-auto md:h-80 object-cover"
          />
        </div>
        <div className="p-4 md:p-6 flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">
            {feature.title}
          </h2>
          <p className="text-sm md:text-base text-center">{feature.description}</p>
        </div>
      </div>
    ))}
  </div>

  {/* CTA */}
  <div className="text-center bg-transparent mb-10 px-4 md:px-20">
    <p className="text-orange-400 text-lg md:text-xl mb-4">
      Ready to explore thoughts? Login or register to get started!
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <a
        href="/login"
        className="bg-orange-500 text-white font-bold px-6 py-2 rounded-md shadow-lg transform transition hover:scale-105 hover:bg-orange-600"
      >
        Login
      </a>
      <a
        href="/register"
        className="bg-white text-orange-500 font-bold px-6 py-2 rounded-md shadow-lg transform transition hover:scale-105 hover:bg-orange-100"
      >
        Register
      </a>
    </div>
  </div>

  <Footer />
</div>

  );
};

export default Dashboard;
