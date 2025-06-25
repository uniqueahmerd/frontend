import React from "react";
import Tittle from "../component/Tittle";

const Rules = () => {
  const rules = [
    "The minimum deposit is 300 ETB.",
    "Deposits below the minimum will not be added.",
    "The transfer amount must match the order you created, otherwise the transfer will not be successful.",
    "Create a new shipping request for each payment and specify the account to which the payment will be sent.",
    "Please wait at least 40 minutes after the transfer is successful.",
    "If you don't receive the money for a long time, please log a complaint.",
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Tittle Tittle={"Rules"} />
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Platform Rules</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          {rules.map((rule, index) => (
            <li key={index} className="text-lg">
              {rule}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Rules;
