import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/Index"; // Import your assets

const Tittle = ({ Tittle }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="bg-blue-900 text-white flex py-3 pl-2">
      <div>
        <img
          src={assets.dropdown_icon}
          className="rotate-180"
          width={15}
          onClick={handleNavigate}
        />
      </div>
      <p className="text-center font-semibold text-lg m-auto">{Tittle}</p>
    </div>
  );
};

export default Tittle;
