"use client"
import { Button } from "@/components/ui/button"
import { Bell, Check } from "lucide-react"
import { useState } from "react"

export function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "New Grade Posted",
      message: "Your Database Systems grade has been posted",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      type: "assignment",
      title: "Assignment Due Tomorrow",
      message: "Web Development Project is due tomorrow at 11:59 PM",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      message: "Your tuition payment of ₦150,000 has been verified",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "announcement",
      title: "System Maintenance",
      message: "The system will undergo maintenance on Saturday 8 PM - 10 PM",
      time: "1 day ago",
      read: true,
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationColor = (type) => {
    switch (type) {
      case "alert":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
      case "assignment":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
      case "payment":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
      case "announcement":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
      default:
        return "bg-slate-100 dark:bg-slate-800"
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
      >
        <Bell className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 z-50 max-h-96 flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
          </div>

          <div className="flex-1 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-slate-100 dark:border-slate-800 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                    !notification.read ? "bg-slate-50 dark:bg-slate-800/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium mt-1 ${getNotificationColor(notification.type)}`}
                    >
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{notification.title}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{notification.message}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                      >
                        <Check className="w-4 h-4 text-blue-600" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-600 dark:text-slate-400">
                <p>No notifications</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-800">
            <Button className="w-full text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white">
              View All Notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
