import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/Index";
import axios from "axios";
import { AppContext, backendUrl } from "../contex/Contex";

// ...existing imports...
const Login = () => {
  const { setPhoneNum, navigate } = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentState, setCurrentState] = useState("Login");
  const [otp, setOtp] = useState();
  const [inputOtp, setInputOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Generate OTP when the component mounts
  useEffect(() => {
    if (currentState === "Sign Up") {
      setOtp(Math.floor(1000 + Math.random() * 9000).toString()); // Generate 4-digit OTP
    }
  }, [currentState]);

  const handleVerify = () => {
    if (inputOtp === otp) {
      setVerified(true);
      setOtpError("Verified");
    } else {
      setOtpError("Incorrect OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (currentState === "Sign Up") {
        if (!verified) {
          setError("Please verify the OTP before signing up.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${backendUrl}/api/users/register`,
          {
            userName,
            phoneNumber,
            password,
            referralCode,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          localStorage.setItem("phoneNum", phoneNumber);
          setPhoneNum(phoneNumber);
          navigate("/");
        } else {
          setError(response.data.message);
        }
      } else {
        const response = await axios.post(
          `${backendUrl}/api/users/login`,
          {
            userName,
            password,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          const phoneNum = response.data.phoneNumber; // Assuming phoneNumber is returned
          localStorage.setItem("phoneNum", phoneNum);
          setPhoneNum(phoneNum);
          navigate("/");
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // ...rest of the component remains unchanged...

  return (
    <div className="flex flex-col h-screen items-center">
      <div className="flex flex-col mt-30 w-full justify-center items-center">
        <div className="w-30">
          <img src={assets.samsung_logo} alt="Samsung Logo" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full px-2 mt-5"
        >
          <div className="border border-gray-300 rounded-sm">
            <input
              type="text"
              placeholder="Enter Your Username"
              className="outline-none py-2 px-3"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="border border-gray-300 rounded-sm">
            <input
              type="password"
              placeholder="Enter password"
              className="outline-none py-2 px-3"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {currentState === "Login" && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {currentState === "Sign Up" && (
            <>
              <div className="border border-gray-300 rounded-sm">
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="outline-none py-2 px-3"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  required
                  className="border border-gray-300 rounded-sm outline-none py-2 px-3"
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                />
                <div className="border border-gray-300 rounded-sm px-7 py-3 font-bold text-xl ">
                  <p>{otp}</p>
                </div>
              </div>
              {verified && (
                <p
                  className={`text-sm ${
                    otpError === "Verified" ? "text-green-500" : "text-red-600"
                  }`}
                >
                  {otpError}
                </p>
              )}
              <div className="border border-gray-300 rounded-sm">
                <input
                  type="text"
                  placeholder="Referral Code"
                  className="outline-none py-2 px-3"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
              </div>
              <p className="text-sm text-red-600">{error}</p>
            </>
          )}

          <button
            type="submit"
            onClick={() => handleVerify()}
            className={`w-full bg-blue-900 text-white py-2 text-center rounded-full ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2  justify-center">
                <span className="loader"></span> Authenticating...
              </div>
            ) : (
              currentState
            )}
          </button>
          {currentState === "Login" && (
            <Link
              to="/ResetPassword"
              className="text-blue-900 underline text-center mt-2"
            >
              Forgot password?
            </Link>
          )}

          <div
            className="w-full border-blue-900 border text-blue-900 py-2 text-center rounded-md cursor-pointer mt-2"
            onClick={() => {
              setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
              setError("");
            }}
          >
            {currentState === "Login"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login here"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
