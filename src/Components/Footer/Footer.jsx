import React from "react";
import TractorAnimation from "../TractorAnimation/TractorAnimation";

const Footer = () => {
  return (
    <footer className="relative shadow-xl pt-3 pb-6 mb-1 bg-gradient-to-t from-[#3BB78F] to-[#0BAB64]">
      <div className="container mx-auto px-4">
        <div className="text-center font-semibold pt-4">
          <p className="text-lg font-bold">Team HACK-O-HOLICS</p>
          <p className="text-lg font-bold">Codement Hackathon 2024</p>
        </div>
      </div>
      <TractorAnimation />
    </footer>
  );
};

export default Footer;
