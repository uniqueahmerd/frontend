import React, { useContext, useState } from "react";
import Tittle from "../component/Tittle";
import { AppContext } from "../contex/Contex";
import axios from "axios";
import { backendUrl } from "../contex/Contex";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [message, setMessage] = useState("");
  const { currency, accountBalance, withdrawalHistory, setWithdrawalHistory } =
    useContext(AppContext);

  const handleWithdraw = async () => {
    const withdrawalAmount = parseFloat(amount);

    if (!amount || withdrawalAmount <= 0) {
      setMessage("Please enter a valid amount.");
    } else if (withdrawalAmount < 20) {
      setMessage("The minimum withdrawal amount is 20.");
    } else if (withdrawalAmount > accountBalance) {
      setMessage("Insufficient balance.");
    } else if (!bankName || !accountNumber || !accountName) {
      setMessage("Please fill in all bank details.");
    } else {
      try {
        console.log("Sending withdrawal request with data:", {
          amount: withdrawalAmount,
          bankName,
          accountNumber,
          accountName,
        });

        // Send withdrawal request to the admin
        const response = await axios.post(
          `${backendUrl}/api/transactions/withdraw/request`,
          {
            amount: withdrawalAmount,
            bankName,
            accountNumber,
            accountName,
          },
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setMessage(
            `Your withdrawal request of ${withdrawalAmount} ${currency} has been sent for approval.`
          );

          // Add to withdrawal history
          const newRecord = {
            amount: withdrawalAmount,
            date: new Date().toLocaleString(),
            status: "Pending Approval",
          };
          setWithdrawalHistory([...(withdrawalHistory || []), newRecord]);

          // Clear input fields
          setAmount("");
          setBankName("");
          setAccountNumber("");
          setAccountName("");
        } else {
          setMessage("Failed to send withdrawal request. Please try again.");
        }
      } catch (error) {
        console.error("Error sending withdrawal request:", error);
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Tittle Tittle={"Withdraw"} />
      <div className="mt-6 text-center px-2">
        <p className="text-lg text-gray-700 mb-4">
          Your current balance is{" "}
          <strong>
            {accountBalance} {currency}
          </strong>
          .
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Enter the amount you want to withdraw. The minimum withdrawal amount
          is 20.
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border border-gray-300 rounded-md p-2 w-full max-w-sm"
        />
        <input
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="Enter bank name"
          className="border border-gray-300 rounded-md p-2 w-full max-w-sm mt-4"
        />
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter account number"
          className="border border-gray-300 rounded-md p-2 w-full max-w-sm mt-4"
        />
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Enter account name"
          className="border border-gray-300 rounded-md p-2 w-full max-w-sm mt-4"
        />
        <button
          onClick={handleWithdraw}
          className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4"
        >
          Withdraw
        </button>
        {message && (
          <p className="mt-4 text-gray-700 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
