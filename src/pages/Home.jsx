import React from "react";
import { assets } from "../assets/Index";
import { Link, NavLink } from "react-router-dom";
import Hero from "../component/Hero";

const Home = () => {
  return (
    <div className="flex flex-col gap-3 mb-22">
      <div className="flex items-center justify-between mb-10 mt-5 mx-5">
        <div>
          <img src={assets.samsung_logo} width={100} />
        </div>
      </div>

      <div className="bg-gray-100 flex justify-evenly py-3 items-center text-[13px] mb-5">
        <NavLink to="/Recharge" className="flex flex-col gap-1 items-center">
          <img src={assets.wallet_icon} alt="wallet" width={40} />
          <p className="">Recharge</p>
        </NavLink>
        <NavLink to="Withdraw" className="flex flex-col gap-1 items-center">
          <img src={assets.withdraw_icon} alt="wallet" width={40} />
          <p className="">Withdraw money</p>
        </NavLink>
        <NavLink to="Help" className="flex flex-col gap-1 items-center">
          <img src={assets.help_icon} alt="wallet" width={40} />
          <p className="">Help center</p>
        </NavLink>
      </div>

      <div>
        <Hero />
      </div>
    </div>
  );
};

export default Home;
