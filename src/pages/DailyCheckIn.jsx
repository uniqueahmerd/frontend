import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contex/Contex";
import axios from "axios";
import { backendUrl } from "../contex/Contex";

const DailyCheckIn = () => {
  const { setAccountBalance, currency } = useContext(AppContext);
  const [lastCheckInDate, setLastCheckInDate] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const rewardAmount = 50;

  // Fetch last check-in date from backend on mount
  useEffect(() => {
    const fetchLastCheckIn = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/users/details`, {
          withCredentials: true,
        });
        setLastCheckInDate(res.data.user.lastDailyCheckIn);
      } catch (err) {
        setLastCheckInDate(null);
      }
    };
    fetchLastCheckIn();
  }, []);

  // Helper to check if 24 hours have passed
  const canCheckIn = () => {
    if (!lastCheckInDate) return true;
    const last = new Date(lastCheckInDate);
    const now = new Date();
    return now - last >= 24 * 60 * 60 * 1000;
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/users/daily-checkin`,
        {}, // empty data object
        { withCredentials: true } // config object
      );

      setAccountBalance(res.data.wallet);
      setLastCheckInDate(res.data.lastDailyCheckIn);
      setMessage(
        `You have successfully checked in and earned ${currency} ${rewardAmount}!`
      );
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "You have already checked in today. Come back tomorrow!"
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Daily Check-In</h1>
      <p className="text-lg mb-6">
        Check in daily to earn {currency} {rewardAmount}!
      </p>
      <button
        onClick={handleCheckIn}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={!canCheckIn() || loading}
      >
        {loading ? "Checking In..." : "Check In"}
      </button>
      {lastCheckInDate && (
        <p className="mt-2 text-gray-500 text-sm">
          Last check-in: {new Date(lastCheckInDate).toLocaleString()}
        </p>
      )}
      {message && (
        <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default DailyCheckIn;
