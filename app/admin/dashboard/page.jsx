"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, DollarSign, Settings, FileText, BarChart3 } from "lucide-react"

const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Lecturers", href: "/admin/lecturers", icon: Users },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Payments", href: "/admin/payments", icon: DollarSign },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex">
        <Sidebar role="admin" items={adminNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Admin Dashboard" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Welcome Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="md:col-span-2 p-6 border-red-100 dark:border-slate-800 bg-gradient-to-br from-red-600 to-red-700 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, Administrator!</h2>
                <p className="text-red-100">System operational. 2 pending approvals & 1 system alert</p>
              </Card>

              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">98.5%</div>
                  <p className="text-slate-600 dark:text-slate-400">System Uptime</p>
                </div>
              </Card>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">1,245</p>
                  </div>
                  <Users className="w-10 h-10 text-blue-100 dark:text-blue-900" />
                </div>
              </Card>

              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Active Lecturers</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">87</p>
                  </div>
                  <Users className="w-10 h-10 text-green-100 dark:text-green-900" />
                </div>
              </Card>

              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Active Courses</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">156</p>
                  </div>
                  <BookOpen className="w-10 h-10 text-purple-100 dark:text-purple-900" />
                </div>
              </Card>

              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">₦2.5M</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-yellow-100 dark:text-yellow-900" />
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Pending Approvals */}
              <Card className="lg:col-span-2 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Pending Approvals</h3>
                <div className="space-y-3">
                  {[
                    {
                      type: "Payment",
                      reference: "PAY-2024-001",
                      amount: "₦150,000",
                      student: "Ahmed Ali",
                      status: "pending",
                    },
                    {
                      type: "Course Registration",
                      reference: "REG-2024-045",
                      student: "Fatima Hassan",
                      courses: "3 courses",
                      status: "pending",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-yellow-200 dark:border-slate-800 rounded-lg bg-yellow-50 dark:bg-slate-800"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-slate-900 dark:text-white">{item.type}</p>
                            <span className="text-xs px-2 py-1 bg-yellow-200 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded">
                              {item.reference}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {item.student} {item.amount && `- ${item.amount}`} {item.courses && `- ${item.courses}`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 bg-transparent"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* System Alerts */}
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">System Alerts</h3>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-red-600 bg-red-50 dark:bg-red-900/20 rounded">
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">High CPU Usage</p>
                    <p className="text-xs text-red-700 dark:text-red-400 mt-1">87% - Server 01</p>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Disk Space Low</p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">23% free on Backup Drive</p>
                  </div>
                  <div className="p-3 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Update Available</p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">System v2.1.0 ready to install</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Enrollment Trend */}
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Enrollment by Department</h3>
                <div className="space-y-4">
                  {[
                    { dept: "Computer Science", students: 345, percentage: 28 },
                    { dept: "Engineering", students: 289, percentage: 23 },
                    { dept: "Business", students: 267, percentage: 21 },
                    { dept: "Sciences", students: 234, percentage: 19 },
                    { dept: "Liberal Arts", students: 110, percentage: 9 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{item.dept}</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{item.students}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${item.percentage * 4}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Activities */}
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {[
                    { action: "New student registered", user: "Chisom Okafor", time: "2 min ago" },
                    { action: "Payment verified", reference: "PAY-2024-098", time: "15 min ago" },
                    { action: "Course created", course: "CS401", time: "1 hour ago" },
                    { action: "Lecturer assigned", lecturer: "Dr. Obi Ejiofor", course: "MTH201", time: "3 hours ago" },
                    { action: "System backup completed", size: "2.3 GB", time: "5 hours ago" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 pb-3 border-b border-slate-200 dark:border-slate-800 last:border-0 last:pb-0"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{item.action}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {item.user || item.reference || item.course || item.lecturer || item.size}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-500 whitespace-nowrap">{item.time}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Management Actions */}
            <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Management Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white py-4 justify-center flex-col">
                  <Users className="w-5 h-5 mb-2" />
                  Manage Students
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white py-4 justify-center flex-col">
                  <Users className="w-5 h-5 mb-2" />
                  Manage Lecturers
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white py-4 justify-center flex-col">
                  <BookOpen className="w-5 h-5 mb-2" />
                  Manage Courses
                </Button>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white py-4 justify-center flex-col">
                  <DollarSign className="w-5 h-5 mb-2" />
                  View Payments
                </Button>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
