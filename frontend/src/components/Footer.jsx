import React from "react";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-orange-50 border-t  border-orange-200 md:text-xl text-xs text-gray-700 font-oswald">

      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
        
        {/* About */}
        <div className=" md:text-xl text-xs">
          <h3 className="text-lg font-bold text-orange-600 mb-2">About</h3>
          <p className="text-sm leading-relaxed">
            Sangam is a thought-sharing platform where ideas connect people.
            Share your voice, explore perspectives, and grow together.
          </p>
        </div>

        {/* Contact / Connections */}
        <div className=" md:text-xl text-xs">
          <h3 className="text-lg font-bold text-orange-600 mb-2">Connect</h3>
          <p className="text-sm">Email: haraprasadmahapatra223@gmail.com</p>
          <p className="text-sm">Phone: +91 9537362412</p>
          <div className="flex justify-center md:justify-start mt-3">
            <a
              href="https://www.linkedin.com/in/haraprasad-mahapatra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800 flex items-center gap-1"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </div>
        </div>
        
      </div>
      <div className="border-t border-orange-200 py-4 text-center  md:text-xl text-xs  mb-12 md:mb-4 text-gray-600">
         <p className="text-sm"> Designed & Developed by{" "}</p>
          <a
            href="https://www.linkedin.com/in/haraprasad-mahapatra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 font-semibold text-sm hover:underline"
          >
            Haraprasad Mahapatra
          </a>
        </div>
    </footer>
  );
};

export default Footer;
