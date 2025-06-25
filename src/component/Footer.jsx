import { FaUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="max-w-sm flex justify-evenly items-center bg-gray-100 py-3 fixed bottom-0 w-full">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-blue-900"
            : "flex flex-col items-center text-gray-300"
        }
      >
        <AiFillHome className="text-4xl" />
        <p>Home</p>
      </NavLink>
      <NavLink
        to="/Product"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-blue-900"
            : "flex flex-col items-center text-gray-300"
        }
      >
        <FaShop className="text-4xl" />
        <p>Product</p>
      </NavLink>
      <NavLink
        to="/Earn"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-blue-900"
            : "flex flex-col items-center text-gray-300"
        }
      >
        <TbMoneybag className="text-4xl" />
        <p>Earn</p>
      </NavLink>
      <NavLink
        to="/Profile"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center text-blue-900"
            : "flex flex-col items-center text-gray-300"
        }
      >
        <FaUser className="text-4xl" />
        <p>Profile</p>
      </NavLink>
    </div>
  );
};

export default Footer;
