import React, { useContext } from "react";
import { AppContext } from "../contex/Contex";
import Tittle from "./Tittle";

const ProductRev_Quan = () => {
  const { purchasedProducts, currency } = useContext(AppContext);
  console.log(purchasedProducts);
  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <Tittle Tittle={"My Products"} />

      {purchasedProducts.length > 0 ? (
        <ul className="space-y-4">
          {purchasedProducts.map((product) => (
            <li
              key={product.productId._id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <div className="flex flex-col gap-2">
                {console.log("Product:", product)}
                <p className="text-lg font-semibold text-gray-800">
                  Product Name:{" "}
                  <span className="text-blue-600">
                    {product.productId.name}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Price:{" "}
                  <span className="text-green-600">
                    {currency} {product.productId.price}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Quantity:{" "}
                  <span className="text-purple-600">{product.quantity}</span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Today's Income:{" "}
                  <span className="text-purple-600">
                    {product.productId &&
                    !isNaN(Number(product.quantity)) &&
                    !isNaN(Number(product.productId.total_income))
                      ? (
                          (Number(product.quantity) *
                            Number(product.productId.total_income)) /
                          7
                        ).toFixed(2)
                      : "0.00"}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Total Income:{" "}
                  <span className="text-purple-600">{product.totalEarned}</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={product.productId.image}
                  className="w-30"
                  alt="Product"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default ProductRev_Quan;
