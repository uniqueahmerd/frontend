/* eslint-disable no-constant-condition */
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Footer from "./component/Footer";
import AboutUs from "./pages/AboutUs";
import ManageRecharge from "./pages/ManageRecharge";
import CustomerCare from "./pages/CustomerCare";

import Help from "./pages/Help";
import ManageWithdrawal from "./pages/ManageWithdrawal";
import Recharge from "./pages/Recharge";
import Rules from "./pages/Rules";
import Withdraw from "./pages/Withdraw";
import DailyCheckIn from "./pages/DailyCheckIn";

import ProductRev_Quan from "./component/ProductRev_Quan";
import TeamSize_income from "./pages/TeamSize_income";
import ResetPassword from "./pages/ResetPassword";

// export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/Login", "/ResetPassword"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  return (
    <div className="max-w-sm m-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Earn" element={<Team />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ManageRecharge" element={<ManageRecharge />} />
        <Route path="/DailyCheckIn" element={<DailyCheckIn />} />
        <Route path="/CustomerCare" element={<CustomerCare />} />

        <Route path="/Help" element={<Help />} />
        <Route path="/ManageWithdrawal" element={<ManageWithdrawal />} />
        <Route path="/ProductYouPurchased" element={<ProductRev_Quan />} />
        <Route path="/Recharge" element={<Recharge />} />
        <Route path="/Rules" element={<Rules />} />
        <Route path="/Withdraw" element={<Withdraw />} />
        <Route path="/TeamSize" element={<TeamSize_income />} />
        <Route path="/TotalTeamIncome" element={<TeamSize_income />} />

        <Route path="/ProductQuantity" element={<ProductRev_Quan />} />
        <Route path="/ProductRevenue" element={<ProductRev_Quan />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default App;
