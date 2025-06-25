import React from "react";
import { assets } from "../assets/Index";
const ProfileMenu = ({ imgUrl, tittle }) => {
  return (
    <div className=" flex justify-between items-center bg-white px-2 py-5 border-b border-gray-200 ">
      <div className="flex items-center gap-3">
        <img src={imgUrl} width={30} />
        <p className="text-lg">{tittle}</p>
      </div>
      <div className="w-8 ">
        <img src={assets.dropdown_icon} width={15} />
      </div>
    </div>
  );
};

export default ProfileMenu;
