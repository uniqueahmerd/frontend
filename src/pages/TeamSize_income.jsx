import React, { useContext } from "react";
import { AppContext } from "../contex/Contex";
import Tittle from "../component/Tittle";

const TeamSize_income = () => {
  const { purchasedProducts, currency, removeProductFromCart } =
    useContext(AppContext);

  return (
    <div className="bg-gray-200 h-screen">
      <Tittle Tittle={"My Team"} />
      <div className="w-full bg-white mt-10 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Cart</h2>
        {purchasedProducts.length > 0 ? (
          <ul className="space-y-4">
            {purchasedProducts.map((product, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold text-gray-800">
                    Product Name:{" "}
                    <span className="text-blue-600">{product.name}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Price:{" "}
                    <span className="text-green-600">
                      {currency} {product.price}
                    </span>
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Quantity:{" "}
                    <span className="text-purple-600">{product.quantity}</span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => removeProductFromCart(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamSize_income;
