import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { PageNotFound } from "../common/components";
import LoginPage from "../pages/Auth/Login/LoginPage";
import OtpVerificationPage from "../pages/Auth/Verification/OtpVerificationPage";
import SignUpPage from "../pages/Auth/Signup/SignUpPage";
import BookingRoutes from "../pages/Booking/BookingRoutes";

const PagesRoutes = () => {
  return (
    <Router basename={"/"}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route exact path="/" element={<SignUpPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/email-verify" element={<OtpVerificationPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<DashboardPage />} />
          {/* Booking Routes */}
          <Route path="/booking/*" element={<BookingRoutes />} />
        </Route>
        <Route>
          <Route path="*" element={<PageNotFound />} from="user" />
        </Route>
      </Routes>
    </Router>
  );
};

export default PagesRoutes;
