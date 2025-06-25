import React, { useContext } from "react";
import { assets } from "../assets/Index";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileMenu from "../component/ProfileMenu";
import { AppContext } from "../contex/Contex";

const Profile = () => {
  const { menu, currency, accountBalance, phoneNum } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <div className="pb-22">
      <div className="bg-blue-900 flex py-4 justify-between items-center px-2">
        <div className="bg-white py-7 px-3 rounded-full">
          <img src={assets.samsung_logo} width={50} className="m-0" />
        </div>
        <div className="flex text-white text-sm flex-col gap-3 font-semibold">
          <p>Welcome to samsung</p>
          <p>{phoneNum} </p>
        </div>
        <div>
          <button
            onClick={logout}
            className="py-2 px-3 bg-white text-black rounded-sm"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-gray-100 flex justify-evenly py-3 items-center text-[13px] mb-5">
        <NavLink to="/Recharge" className="flex flex-col gap-1 items-center">
          <img src={assets.wallet_icon} alt="wallet" width={40} />
          <p className="">Recharge</p>
        </NavLink>
        <NavLink to="/Withdraw" className="flex flex-col gap-1 items-center">
          <img src={assets.withdraw_icon} alt="wallet" width={40} />
          <p className="">Withdraw money</p>
        </NavLink>

        <NavLink
          to="/DailyCheckIn"
          className="flex flex-col gap-1 items-center"
        >
          <img src={assets.gift_icon} alt="wallet" width={40} />
          <p className="">Daily check-in</p>
        </NavLink>
      </div>

      <div className="bg-blue-900 text-white  mx-2  rounded-lg pl-3 py-3">
        <p className="font-semibold text-xl">
          {currency} {accountBalance}
        </p>
        <p className="text-sm mt-3">Account balance</p>
      </div>

      <div className="bg-gray-200 mt-6 flex flex-col">
        {menu.map((item, index) => (
          <NavLink to={item.path} key={index}>
            <ProfileMenu imgUrl={item.image} tittle={item.name} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Profile;
