import { NavLink } from "react-router-dom";
import { assets } from "../assets/Index";
import Tittle from "../component/Tittle";

const CustomerCare = () => {
  return (
    <div className="pb-23">
      <Tittle Tittle={"Customer Care"} />

      <div>
        <img src={assets.customer_service} />
      </div>

      <div className="flex items-center px-2 justify-between pt-5">
        <div className="flex flex-col gap-3 ">
          <b>Customer Care Online Time</b>

          <p className="bg-blue-900 rounded-full p-2 text-white w-30 text-center font-bold">
            9:00 - 20:00
          </p>
        </div>
        <div>
          <img src={assets.samsung_logo} width={130} />
        </div>
      </div>
      <div className="bg-gray-200 flex flex-col gap-2 px-2 mt-5">
        <NavLink className="bg-blue-900 rounded-sm text-white flex items-center justify-between py-3  px-2">
          <div className="flex gap-8 items-center ">
            <img src={assets.telegram_icon} width={40} />
            <p>Telegram Customer Service</p>
          </div>
          <img src={assets.dropdown_icon} width={15} />
        </NavLink>
        <div className="bg-blue-900 rounded-sm text-white flex items-center justify-between py-3  px-2">
          <NavLink className="flex gap-8 items-center ">
            <img src={assets.telegram_icon} width={40} />
            <p>Telegram Channel</p>
          </NavLink>
          <img src={assets.dropdown_icon} width={15} />
        </div>
        <NavLink className="bg-blue-900 rounded-sm text-white flex items-center justify-between py-3  px-2">
          <div className="flex gap-8 items-center ">
            <img src={assets.telegram_icon} width={40} />
            <p>Telegram Group</p>
          </div>
          <img src={assets.dropdown_icon} width={15} />
        </NavLink>
      </div>

      <div className="mt-2 pt-3">
        <ol className="px-2 flex flex-col gap-3 text-sm">
          <li>
            <b>1.</b>
            If you cannot open the official Telegram mentioned above, please the
            browser to open it.
          </li>
          <li>
            <b>2.</b>If you have any question about our platform, please contact
            our online customer support, they will answer all your question.
          </li>
          <li>
            <b>3.</b>If the online customer service fails to reply your message
            in time,please wait patiently.This is because there are too many
            messages. Our customer service will reply your massage as soon as
            possible.Thank you.
          </li>
          <li>
            <b>4.</b> If you want to make more money, be sure to join our
            official Telegram channel
          </li>
        </ol>
      </div>
    </div>
  );
};

export default CustomerCare;
