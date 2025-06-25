import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { menu } from "../assets/Index";
import { useNavigate } from "react-router-dom";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [accountBalance, setAccountBalance] = useState("");
  const [selectedProductTobuy, setSelectedProductTobuy] = useState(null);
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [phoneNum, setPhoneNum] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralBonus, setReferralBonus] = useState(0);
  const navigate = useNavigate();
  const currency = "ETB";
  const productRevenue = 50;

  // Add purchased product to history and update database
  const addToHistory = async (product) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/purchasedProduct/addPurchasedProduct`,
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      setPurchasedProducts(response.data.updatedProducts);
      console.log("Purchased products updated:", response.data.updatedProducts);
    } catch (error) {
      console.error("Error saving purchased product:", error);
    }
  };

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/details`, {
        withCredentials: true,
      });

      if (response.data.data) {
        // You can log userData if you want
        const userData = response.data.data;
        console.log("User details fetched:", userData);
        setUserDetails(userData);
        setPhoneNum(userData.phoneNumber || "");
        setAccountBalance(userData.wallet || "0");
        setPurchasedProducts(userData.products || []);
        setReferralCode(userData.referralCode || "");
        setReferralBonus(userData.referralBonus || 0);
        // setRechargeHistory(userData.rechargeHistory || []);
        // setWithdrawalHistory(userData.withdrawalHistory || []);
      } else {
        console.warn("User details response is invalid or undefined.");
      }
    } catch (error) {
      console.error(
        "Error fetching user details:",
        error.response?.data || error.message
      );
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/list`);
      setProducts(response.data.products);
      console.log("Products fetched:", response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      const storedPhoneNum = localStorage.getItem("phoneNum");
      if (storedPhoneNum) {
        setPhoneNum(storedPhoneNum);
      } else {
        console.warn("Phone number is not available in localStorage.");
      }

      try {
        await fetchProducts();
        await fetchUserDetails();
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/Login");
        }
      }
    };

    fetchInitialData();
  }, []);

  const value = {
    referralBonus,
    referralCode,
    navigate,
    addToHistory,
    purchasedProducts,
    setPurchasedProducts,
    products,
    accountBalance,
    setAccountBalance,
    productRevenue,
    selectedProductTobuy,
    setSelectedProductTobuy,
    withdrawalHistory,
    setWithdrawalHistory,
    rechargeHistory,
    setRechargeHistory,
    currency,
    phoneNum,
    setPhoneNum,
    userDetails,
    fetchUserDetails,

    menu,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
