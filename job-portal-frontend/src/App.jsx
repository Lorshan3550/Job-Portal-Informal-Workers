import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Context } from "./main";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import AboutUs from "./components/About/Aboutus";
import NotFound from "./components/NotFound/NotFound";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import VerifyCode from "./components/Auth/VerifyCode";
import Profile from "./components/Auth/Profile";
import ClientApplications from "./components/Application/ClientApplications";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageJobs from "./components/Admin/ManageJobs";
import ManageApplications from "./components/Admin/ManageApplications";
import ManageUsers from "./components/Admin/ManageUsers";
import AdminHome from "./components/Admin/AdminHome";
import PostReview from "./components/Review/PostReview";
import UpdateReview from "./components/Review/UpdateReview";
import MyReview from "./components/Review/MyReview";
import Review from "./components/Review/Review";
import ManageReviews from "./components/Admin/ManageReviews";
import Notification from "./components/Notifications/Notification";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);


  // Define routes where Navbar and Footer should be hidden
  const hideHeaderFooter =
    location.pathname.startsWith("/admin/") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/verifycode";

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} /> {/* Default content for /admin/dashboard */}
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="manage-applications" element={<ManageApplications />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-reviews" element={<ManageReviews />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verifycode" element={<VerifyCode />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="/applications/client" element={<ClientApplications />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review/me" element={<MyReview />} />
        <Route path="/review/post" element={<PostReview/>} />
        <Route path="/review/update/:reviewId" element={<UpdateReview />} />
        <Route path="/notification" element={<Notification />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
      {!hideHeaderFooter && <Footer />}
      <Toaster />
    </BrowserRouter>
  );
};

export default App;

