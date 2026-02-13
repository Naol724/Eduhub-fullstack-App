import { useState } from 'react';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const [notifications] = useState([
    {
      id: 1,
      title: 'Welcome to EduHub!',
      message: 'Start exploring our courses',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Course Update',
      message: 'New lesson available in React Basics',
      time: '1 day ago',
      read: true
    }
  ]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
      <div className="px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-3 text-sm text-gray-500 text-center">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="px-4 py-2 border-t border-gray-200">
        <button className="text-sm text-indigo-600 hover:text-indigo-500">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;