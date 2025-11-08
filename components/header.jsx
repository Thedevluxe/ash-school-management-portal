"use client"

import { Bell, Settings, User, ChevronDown } from "lucide-react"
import { useState } from "react"

export function Header({ title }) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4 ml-64 lg:ml-64">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative"
            >
              <Bell className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 z-50">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">New Assignment Posted</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">5 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Grade Published</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <Settings className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  )
}
