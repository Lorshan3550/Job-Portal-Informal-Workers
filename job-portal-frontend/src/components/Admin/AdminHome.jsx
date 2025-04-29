import React from "react";

const AdminHome = () => {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Jobs</h2>
          <p className="text-3xl font-bold text-green-600">120</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Applications</h2>
          <p className="text-3xl font-bold text-blue-600">450</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-purple-600">300</p>
        </div>
      </div>

      {/* System Overview Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">System Overview</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span>Active Jobs</span>
            <span className="text-lg font-semibold text-green-600">95</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Closed Jobs</span>
            <span className="text-lg font-semibold text-red-600">25</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Pending Applications</span>
            <span className="text-lg font-semibold text-yellow-600">120</span>
          </li>
        </ul>
      </div>

      {/* Pending Approvals Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Approvals</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span>Job Posting Approval: "Marketing Manager"</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Approve
            </button>
          </li>
          <li className="flex justify-between items-center">
            <span>User Registration Approval: "Jane Doe"</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Approve
            </button>
          </li>
        </ul>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span>New job posted: "Software Engineer"</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Application received for "Graphic Designer"</span>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </li>
          <li className="flex justify-between items-center">
            <span>User "John Doe" registered</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </li>
        </ul>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
            Post a New Job
          </button>
          <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700">
            View All Applications
          </button>
          <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700">
            Manage Users
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminHome;