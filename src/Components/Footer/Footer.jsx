import React, { useState } from "react";
import TractorAnimation from "../TractorAnimation/TractorAnimation";
import { useNavigate } from "react-router-dom";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";

const Footer = () => {
  const navigate = useNavigate();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  
  return (
    <footer className="relative shadow-xl pt-3 pb-6 mb-1 bg-gradient-to-t from-[#3BB78F] to-[#0BAB64]">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-left">
          
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <AiFillGithub className="text-white text-3xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin className="text-white text-3xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram className="text-white text-3xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <AiFillTwitterCircle className="text-white text-3xl" />
            </a>
          </div>
        </div>
        <div className="text-center font-semibold pt-5">
          <p className="text-6xl font-bold text-white font-serif text-black outline-black">Team HACK-O-HOLICS</p>
          <p className="text-4xl font-bold text-white font-serif text-black outline-black">Codement Hackathon 2024</p>
          <p className="text-2xl font-bold text-blue font-serif text-black outline-black" onClick={() => navigate("/tnc")}>Terms and Conditions</p>
        </div>
        <div>
          <p className="text-1xl font-bold text-blue  text-white outline-black">Contact Details:</p>
          <p className="text-1xl font-bold text-blue  text-white outline-black">Helpline No: +91 88888888888</p>
          <p className="text-1xl font-bold text-blue  text-white outline-black">kisaanseva@gmail.com</p>
          
        </div>
      </div>
      <TractorAnimation />
    </footer>
  );
};

export default Footer;
