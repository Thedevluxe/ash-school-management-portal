"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, AlertCircle, TrendingUp, Download, FileText, CreditCard, Calendar } from "lucide-react"

const studentNavItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: BookOpen },
  { label: "Courses", href: "/student/courses", icon: BookOpen },
  { label: "Results", href: "/student/results", icon: TrendingUp },
  { label: "Payments", href: "/student/payments", icon: CreditCard },
  { label: "Timetable", href: "/student/timetable", icon: Calendar },
  { label: "Documents", href: "/student/documents", icon: FileText },
]

export default function StudentDashboard() {
  return (
    <ProtectedRoute requiredRole="student">
      <div className="flex">
        <Sidebar role="student" items={studentNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Dashboard" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Welcome Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="md:col-span-2 p-6 border-blue-100 dark:border-slate-800 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
                <p className="text-blue-100">You have 3 pending assignments and 2 new grades</p>
              </Card>

              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">3.75</div>
                  <p className="text-slate-600 dark:text-slate-400">Current GPA</p>
                </div>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Enrolled Courses</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">6</p>
                  </div>
                  <BookOpen className="w-10 h-10 text-blue-100 dark:text-blue-900" />
                </div>
              </Card>

              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Pending Tasks</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">3</p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-yellow-100 dark:text-yellow-900" />
                </div>
              </Card>

              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Attendance</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">92%</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-100 dark:text-green-900" />
                </div>
              </Card>

              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Balance Due</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">₦0</p>
                  </div>
                  <CreditCard className="w-10 h-10 text-green-100 dark:text-green-900" />
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pending Assignments */}
              <Card className="lg:col-span-2 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Pending Assignments</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Database Design Project",
                      course: "Database Systems",
                      due: "Due in 3 days",
                      status: "warning",
                    },
                    { title: "Essay on IoT", course: "Emerging Technologies", due: "Due in 5 days", status: "normal" },
                    {
                      title: "Algorithm Implementation",
                      course: "Advanced Algorithms",
                      due: "Due in 7 days",
                      status: "normal",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{item.course}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-slate-600 dark:text-slate-400">
                            <Clock className="w-4 h-4" /> {item.due}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 dark:border-blue-700 bg-transparent"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5">
                    <BookOpen className="w-4 h-4 mr-2" /> Register Courses
                  </Button>
                  <Button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-5">
                    <Download className="w-4 h-4 mr-2" /> View Results
                  </Button>
                  <Button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-5">
                    <CreditCard className="w-4 h-4 mr-2" /> Pay Fees
                  </Button>
                  <Button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-5">
                    <FileText className="w-4 h-4 mr-2" /> Get Transcript
                  </Button>
                </div>
              </Card>
            </div>

            {/* Recent Grades */}
            <Card className="mt-6 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Grades</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Course</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Grade</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Points</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { course: "Data Structures", grade: "A", points: "4.0", status: "Excellent" },
                      { course: "Web Development", grade: "A-", points: "3.7", status: "Excellent" },
                      { course: "Database Systems", grade: "B+", points: "3.3", status: "Good" },
                    ].map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{item.course}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{item.grade}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{item.points}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
