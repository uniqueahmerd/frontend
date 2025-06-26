import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../contex/Contex";

const ResetPassword = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [message, setMessage] = useState("");
  const { navigate, backendUrl } = useContext(AppContext);

  // Generate OTP when the component mounts
  useEffect(() => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
  }, []);

  const onSubmiHandler = async (e) => {
    e.preventDefault();

    // First, verify OTP and password match
    if (inputOtp !== otp) {
      setOtpError("Incorrect OTP");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password Did not Match");
      return;
    }

    setOtpError("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${backendUrl}/api/users/reset-password`,
        {
          phone,
          newPassword,
        }
      );

      if (response.data.success) {
        setMessage(response.data.message);
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 px-3">
      <h2 className="text-xl mb-4 font-bold">Reset Password</h2>

      <form onSubmit={onSubmiHandler} className="flex flex-col gap-3 w-80">
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded-sm outline-none py-2 px-3"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-gray-300 rounded-sm outline-none py-2 px-3"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-sm outline-none py-2 px-3"
        />
        <p className="text-sm text-red-600">{error}</p>
        <p className="text-sm text-green-600">{message}</p>

        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Enter OTP"
            className="border border-gray-300 rounded-sm outline-none py-2 px-3"
            value={inputOtp}
            onChange={(e) => setInputOtp(e.target.value)}
          />
          <div className="border border-gray-300 rounded-sm px-7 py-2 font-bold text-xl">
            <p>{otp}</p>
          </div>
        </div>
        <p className="text-red-600 text-sm">{otpError}</p>
        <button
          type="submit"
          className={`bg-blue-900 text-white py-2 rounded mt-5 w-full ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
