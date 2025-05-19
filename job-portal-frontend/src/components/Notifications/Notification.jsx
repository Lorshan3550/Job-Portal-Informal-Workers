import React, { useEffect, useState } from "react";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState({ received: [], sent: [] });
  const [activeTab, setActiveTab] = useState("All");
  const [expandedNotification, setExpandedNotification] = useState(null);

  const tabs = ["All", "Job Application", "Job Posting", "Review", "Account"];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/notification/notification-loggedIn-user",
          { withCredentials: true }
        );
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const filterNotifications = (notifications) => {
    if (activeTab === "All") return notifications;
    return notifications.filter((n) => n.about === activeTab);
  };

  const renderNotificationCard = (notification, type) => (
    <div
      key={notification._id}
      className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 transition-all"
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() =>
          setExpandedNotification(
            expandedNotification === notification._id ? null : notification._id
          )
        }
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
          <p className="text-sm text-gray-600">{notification.description}</p>
          <span className="text-sm font-bold text-green-600">{notification.about}</span>
        </div>
        <button className="text-blue-600 font-bold">
          {expandedNotification === notification._id ? "Collapse" : "Expand"}
        </button>
      </div>
      {expandedNotification === notification._id && (
        <div className="mt-4 text-gray-700 space-y-2">
          <div>
            <strong>Sender:</strong> {notification.sender.name || `${notification.sender.firstName} ${notification.sender.lastName}`}
          </div>
          <div>
            <strong>Receiver:</strong> {notification.receiver.name || `${notification.receiver.firstName} ${notification.receiver.lastName}`}
          </div>
          <div>
            <strong>About:</strong> {notification.about}
          </div>
          <div>
            <strong>Created At:</strong> {new Date(notification.createdAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 mt-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Notifications</h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Received Notifications */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Received Notifications</h2>
          {filterNotifications(notifications.received).length > 0 ? (
            filterNotifications(notifications.received).map((notification) =>
              renderNotificationCard(notification, "received")
            )
          ) : (
            <p className="text-gray-600">No received notifications.</p>
          )}
        </div>

        {/* Sent Notifications */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sent Notifications</h2>
          {filterNotifications(notifications.sent).length > 0 ? (
            filterNotifications(notifications.sent).map((notification) =>
              renderNotificationCard(notification, "sent")
            )
          ) : (
            <p className="text-gray-600">No sent notifications.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Notification;