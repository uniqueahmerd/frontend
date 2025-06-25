import React from "react";
// import { assets } from "../assets/Index";

const TeamLevel = ({ imgUrl, rate, validUsers, income }) => {
  return (
    <div className="pt-1  ">
      <div className=" bg-white flex justify-evenly items-center py-2">
        <div className="w-14">
          <img src={imgUrl} />
        </div>
        <div>
          <p className="text-center font-semibold">{rate}</p>
          <p className="text-sm text-gray-500">Commission Rate</p>
        </div>
        <div>
          <p className="text-center font-semibold">{validUsers}</p>
          <p className="text-sm text-gray-500">Valis users</p>
        </div>
        <div>
          <p className="text-center font-semibold">{income}</p>
          <p className="text-sm text-gray-500">Income</p>
        </div>
      </div>
    </div>
  );
};

export default TeamLevel;
