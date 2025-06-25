import React, { useContext } from "react";
import { AppContext } from "../contex/Contex";

const ProductItem = ({
  vip,
  img,
  onClick,
  price,
  total_income,
  daily_income,
}) => {
  const { currency } = useContext(AppContext);

  return (
    <div
      className="bg-white pt-2 pb-2 px-2 mb-2 cursor-pointer"
      onClick={onClick} // Handle click event
    >
      <p className="my-3 text-[20px]">{vip}</p>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 flex-1 ">
          <div className="bg-gray-100 text-center py-3 rounded-md">
            <p className="font-semibold">Price: {price}</p>
          </div>
          <div className="flex gap-4 ">
            <div className="bg-gray-100 py-2 px-5 flex flex-col justify-center items-center rounded-md">
              <p className="font-semibold">
                {currency} {total_income}
              </p>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Total income
              </span>
            </div>
            <div className="bg-gray-100 px-5 flex flex-col justify-center items-center rounded-md">
              <p className="font-semibold">
                {currency} {daily_income}
              </p>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Daily income
              </span>
            </div>
          </div>
        </div>
        <div className="w-24">
          <img src={img} />
        </div>
      </div>
      <div className="text-blue-700 text-[12px] mt-5 w-full">
        <p>
          After purchasing the product, the proceeds will be transferred
          directly to your account balance within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
