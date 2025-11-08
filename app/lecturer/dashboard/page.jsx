"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, BarChart3, BookOpen, MessageSquare, AlertCircle, TrendingUp } from "lucide-react"

const lecturerNavItems = [
  { label: "Dashboard", href: "/lecturer/dashboard", icon: BookOpen },
  { label: "Attendance", href: "/lecturer/attendance", icon: Users },
  { label: "Results", href: "/lecturer/results", icon: TrendingUp },
  { label: "Materials", href: "/lecturer/materials", icon: FileText },
  { label: "Students", href: "/lecturer/students", icon: Users },
  { label: "Messages", href: "/lecturer/messages", icon: MessageSquare },
]

export default function LecturerDashboard() {
  return (
    <ProtectedRoute requiredRole="lecturer">
      <div className="flex">
        <Sidebar role="lecturer" items={lecturerNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Dashboard" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Welcome Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="md:col-span-2 p-6 border-purple-100 dark:border-slate-800 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, Dr. Smith!</h2>
                <p className="text-purple-100">You have 2 pending attendance records and 5 new student messages</p>
              </Card>

              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">4</div>
                  <p className="text-slate-600 dark:text-slate-400">Courses Assigned</p>
                </div>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">128</p>
                  </div>
                  <Users className="w-10 h-10 text-blue-100 dark:text-blue-900" />
                </div>
              </Card>

              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Pending Attendance</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">2</p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-yellow-100 dark:text-yellow-900" />
                </div>
              </Card>

              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Results Submitted</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">89%</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-100 dark:text-green-900" />
                </div>
              </Card>

              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Unread Messages</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">5</p>
                  </div>
                  <MessageSquare className="w-10 h-10 text-purple-100 dark:text-purple-900" />
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Assigned Courses */}
              <Card className="lg:col-span-2 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Your Courses</h3>
                <div className="space-y-3">
                  {[
                    { code: "CS301", title: "Database Systems", students: 45, semester: "Fall 2024" },
                    { code: "CS305", title: "Web Development", students: 52, semester: "Fall 2024" },
                    { code: "CS310", title: "Software Engineering", students: 38, semester: "Fall 2024" },
                    { code: "CS320", title: "Mobile Development", students: 41, semester: "Fall 2024" },
                  ].map((course, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-purple-600">{course.code}</p>
                            <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                              {course.semester}
                            </span>
                          </div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mt-1">{course.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <Users className="inline w-4 h-4 mr-1" /> {course.students} Students
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                            Attendance
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-300 dark:border-purple-700 bg-transparent"
                          >
                            Results
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-5">
                    <Users className="w-4 h-4 mr-2" /> Take Attendance
                  </Button>
                  <Button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-5">
                    <BarChart3 className="w-4 h-4 mr-2" /> Upload Results
                  </Button>
                  <Button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-5">
                    <FileText className="w-4 h-4 mr-2" /> Upload Materials
                  </Button>
                  <Button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-5">
                    <MessageSquare className="w-4 h-4 mr-2" /> View Messages
                  </Button>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mt-6 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Attendance recorded", course: "CS301", time: "2 hours ago", status: "success" },
                  { action: "Results uploaded", course: "CS305", time: "5 hours ago", status: "success" },
                  { action: "New student message", course: "CS310", time: "1 hour ago", status: "pending" },
                  { action: "Course material updated", course: "CS320", time: "Yesterday", status: "success" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${item.status === "success" ? "bg-green-600" : "bg-blue-600"}`}
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{item.action}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{item.course}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{item.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
