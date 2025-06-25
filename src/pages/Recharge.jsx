import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../contex/Contex";
import Tittle from "../component/Tittle";
import { assets } from "../assets/Index";
import axios from "axios";
import { backendUrl } from "../contex/Contex";
import { io } from "socket.io-client";

const Recharge = () => {
  const { currency, accountBalance, setAccountBalance } =
    useContext(AppContext);
  const [amount, setAmount] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
  const [accountName, setAccountName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io(backendUrl);

    // Listen for balance updates
    socket.on("balanceUpdated", (data) => {
      setAccountBalance(data.newBalance);
      console.log("Balance updated:", data.newBalance);
    });

    return () => {
      socket.disconnect();
    };
  }, [backendUrl, setAccountBalance]);

  const handleDepositRequest = async () => {
    const depositAmount = parseFloat(amount);

    if (!amount || depositAmount <= 0) {
      setMessage("Please enter a valid deposit amount.");
      return;
    }

    if (!transactionDetails) {
      setMessage("Please provide transaction details.");
      return;
    }

    if (!accountName) {
      setMessage("Please provide the account name used for the deposit.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/transactions/deposit`, // Corrected API endpoint
        { amount: depositAmount, transactionDetails, accountName },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setMessage("Deposit request submitted successfully.");
        setAmount("");
        setTransactionDetails("");
        setAccountName("");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting deposit request:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col pb-22">
      <Tittle Tittle={"Recharge"} />
      <div className="relative">
        <img src={assets.recharge} alt="" />
        <div className="absolute top-12 ml-2 text-white flex flex-col gap-2">
          <p className="text-xl font-semibold">
            {currency} {accountBalance}
          </p>
          <p className="text-sm font-semibold">Account balance</p>
        </div>
      </div>

      <div className="bg-gray-200 pt-3 px-2">
        <div className="mb-5">
          <p className="text-2xl text-gray-700 font-bold">Account Details</p>
          <p className="font-semibold text-lg my-2">
            Bank Name:<span className="text-gray-500"> Your Bank</span>
          </p>
          <p className="font-semibold text-lg  my-2">
            Account Number:<span className="text-gray-500"> 123456789</span>
          </p>
          <p className="font-semibold text-lg my-2">
            Account Name:<span className="text-gray-500"> John Doe</span>
          </p>
        </div>
        <div className="border border-gray-500 mt-3 py-3 px-3 rounded-full">
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder={`${currency} Enter deposit amount`}
            className="w-full outline-none"
          />
        </div>

        <div className="border border-gray-500 mt-3 py-3 px-3 rounded-full">
          <input
            type="text"
            value={transactionDetails}
            onChange={(event) => setTransactionDetails(event.target.value)}
            placeholder="Enter transaction details (e.g., bank name, reference number)"
            className="w-full outline-none"
          />
        </div>

        <div className="border border-gray-500 mt-3 py-3 px-3 rounded-full">
          <input
            type="text"
            value={accountName}
            onChange={(event) => setAccountName(event.target.value)}
            placeholder="Enter the account name used for the deposit"
            className="w-full outline-none"
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded-md mt-4 ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="bg-white py-3 px-4 mt-3">
          <button
            className="py-2 w-full text-white bg-blue-900"
            onClick={handleDepositRequest}
          >
            Submit Deposit Request
          </button>
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold mb-2">
            <b>Rules</b>
          </p>
          <p className="text-md mb-2">
            - Please ensure that the deposit is made to the account details
            provided above.
          </p>
          <p className="text-md mb-2">
            - After making the deposit, submit the transaction details, amount
            and account name used for the deposit.
          </p>
          <p className="text-md mb-2">
            - After submitting your deposit request, please wait for our team to
            verify the deposit.
          </p>
          <p className="text-md mb-2">
            - Your account will be credited once the deposit is verified.
          </p>
          <p className="text-md mb-2">
            - Please allow up to 1-2 hours for your deposit to be processed.
          </p>

          <p className="text-md mb-2">
            - If you have any questions, feel free to contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
