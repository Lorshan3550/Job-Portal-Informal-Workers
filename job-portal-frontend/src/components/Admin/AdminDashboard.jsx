import React from "react";
import { FaUsers, FaBriefcase, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate("/admin/login");
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-6">
          <div className="flex items-center justify-center mb-6">
            <img src="/public/logo.png" alt="Logo" className="bg-white h-25 w-25" />
          </div>
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
          <nav className="space-y-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
            >
              <FaBriefcase />
              <span>Home</span>
            </Link>
            <Link
              to="/admin/dashboard/manage-jobs"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
            >
              <FaBriefcase />
              <span>Manage Jobs</span>
            </Link>
            <Link
              to="/admin/dashboard/manage-applications"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
            >
              <FaFileAlt />
              <span>Manage Applications</span>
            </Link>
            <Link
              to="/admin/dashboard/manage-users"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
            >
              <FaUsers />
              <span>Manage Users</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 w-full text-left"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet /> {/* This is where nested routes will render */}
        </main>
      </div>
    </section>
  );
};

export default AdminDashboard;