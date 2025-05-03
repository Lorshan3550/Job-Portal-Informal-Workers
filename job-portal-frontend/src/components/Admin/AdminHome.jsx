import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    closedJobs: 0,
    pendingApplications: 0,
    nonApprovedJobs: 0,
  });
  const [recentActivity, setRecentActivity] = useState({
    jobs: [],
    applications: [],
    users: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/admin/dashboard-stats", {
          withCredentials: true,
        });
        setStats(data.stats);
        setRecentActivity(data.recentActivity);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return <p>Loading dashboard stats...</p>;
  }

  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Jobs</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalJobs}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Applications</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalApplications}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
        </div>
      </div>

      {/* System Overview Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">System Overview</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span>Active Jobs</span>
            <span className="text-lg font-semibold text-green-600">{stats.activeJobs}</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Closed Jobs</span>
            <span className="text-lg font-semibold text-red-600">{stats.closedJobs}</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Pending Applications</span>
            <span className="text-lg font-semibold text-yellow-600">{stats.pendingApplications}</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Non-Approved Jobs</span>
            <span className="text-lg font-semibold text-orange-600">{stats.nonApprovedJobs}</span>
          </li>
        </ul>
      </div>

      {/* Pending Approvals Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Approvals</h2>
        <ul className="space-y-4">
          {stats.nonApprovedJobs > 0 ? (
            recentActivity.jobs.map((job) => (
              <li key={job._id} className="flex justify-between items-center">
                <span>Job Posting Approval: "{job.title}"</span>
                <Link to="/admin/dashboard/manage-applications" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Approve
                  </button>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No pending approvals.</p>
          )}
        </ul>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          {recentActivity.jobs.map((job) => (
            <li key={job._id} className="flex justify-between items-center">
              <span>New job posted: "{job.title}"</span>
              <span className="text-sm text-gray-500">{new Date(job.createdAt).toLocaleString()}</span>
            </li>
          ))}
          {recentActivity.applications.map((application) => (
            <li key={application._id} className="flex justify-between items-center">
              <span>
                Application received for "{application.jobId?.title}" by {application.firstName}{" "}
                {application.lastName}
              </span>
              <span className="text-sm text-gray-500">{new Date(application.appliedAt).toLocaleString()}</span>
            </li>
          ))}
          {recentActivity.users.map((user) => (
            <li key={user._id} className="flex justify-between items-center">
              <span>User "{user.firstName} {user.lastName}" registered</span>
              <span className="text-sm text-gray-500">{new Date(user.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Link to="/admin/dashboard/manage-applications" className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 text-center">
            <button>
              View All Applications
            </button>
          </Link>

          <Link to="/admin/dashboard/manage-users" className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 text-center">
            <button>
              Manage Users
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AdminHome;