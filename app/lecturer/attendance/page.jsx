"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, TrendingUp, FileText, MessageSquare, Check, X, Search, Clock } from "lucide-react"
import { useState } from "react"

const lecturerNavItems = [
  { label: "Dashboard", href: "/lecturer/dashboard", icon: BookOpen },
  { label: "Attendance", href: "/lecturer/attendance", icon: Users },
  { label: "Results", href: "/lecturer/results", icon: TrendingUp },
  { label: "Materials", href: "/lecturer/materials", icon: FileText },
  { label: "Students", href: "/lecturer/students", icon: Users },
  { label: "Messages", href: "/lecturer/messages", icon: MessageSquare },
]

export default function LecturerAttendance() {
  const [selectedCourse, setSelectedCourse] = useState("CS301")
  const [searchQuery, setSearchQuery] = useState("")
  const [attendance, setAttendance] = useState([
    { id: 1, matricNo: "STU001", name: "Ahmed Ali", status: "present" },
    { id: 2, matricNo: "STU002", name: "Fatima Hassan", status: "present" },
    { id: 3, matricNo: "STU003", name: "Ibrahim Oluwale", status: "absent" },
    { id: 4, matricNo: "STU004", name: "Zainab Muhammad", status: "present" },
    { id: 5, matricNo: "STU005", name: "Chisom Okafor", status: "late" },
    { id: 6, matricNo: "STU006", name: "Muhammed Adebayo", status: "present" },
    { id: 7, matricNo: "STU007", name: "Grace Amadi", status: "absent" },
    { id: 8, matricNo: "STU008", name: "Segun Adeyemi", status: "present" },
  ])

  const courses = [
    { id: "CS301", title: "Database Systems", students: 45 },
    { id: "CS305", title: "Web Development", students: 52 },
    { id: "CS310", title: "Software Engineering", students: 38 },
    { id: "CS320", title: "Mobile Development", students: 41 },
  ]

  const toggleAttendance = (id) => {
    setAttendance(
      attendance.map((student) => {
        if (student.id === id) {
          const statuses = ["present", "absent", "late"]
          const currentIdx = statuses.indexOf(student.status)
          const nextStatus = statuses[(currentIdx + 1) % statuses.length]
          return { ...student, status: nextStatus }
        }
        return student
      }),
    )
  }

  const filteredStudents = attendance.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.matricNo.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const presentCount = attendance.filter((s) => s.status === "present").length
  const absentCount = attendance.filter((s) => s.status === "absent").length
  const lateCount = attendance.filter((s) => s.status === "late").length

  return (
    <ProtectedRoute requiredRole="lecturer">
      <div className="flex">
        <Sidebar role="lecturer" items={lecturerNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Attendance Management" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Course Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Select Course</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedCourse === course.id
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300"
                    }`}
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">{course.id}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{course.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{course.students} Students</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Attendance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{attendance.length}</p>
                </div>
              </Card>

              <Card className="p-4 border-green-200 dark:border-slate-800 bg-green-50 dark:bg-slate-900">
                <div className="text-center">
                  <p className="text-sm text-green-600 dark:text-green-400">Present</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">{presentCount}</p>
                </div>
              </Card>

              <Card className="p-4 border-red-200 dark:border-slate-800 bg-red-50 dark:bg-slate-900">
                <div className="text-center">
                  <p className="text-sm text-red-600 dark:text-red-400">Absent</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">{absentCount}</p>
                </div>
              </Card>

              <Card className="p-4 border-yellow-200 dark:border-slate-800 bg-yellow-50 dark:bg-slate-900">
                <div className="text-center">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">Late</p>
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{lateCount}</p>
                </div>
              </Card>
            </div>

            {/* Attendance Table */}
            <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Student Attendance</h3>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Save Attendance</Button>
              </div>

              {/* Search */}
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or matric number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Matric No.</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Student Name</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{student.matricNo}</td>
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{student.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                student.status === "present"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                  : student.status === "absent"
                                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                              }`}
                            >
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => toggleAttendance(student.id)}
                              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              {student.status === "present" ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : student.status === "absent" ? (
                                <X className="w-5 h-5 text-red-600" />
                              ) : (
                                <Clock className="w-5 h-5 text-yellow-600" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">No students found matching your search</p>
                </div>
              )}
            </Card>

            {/* Attendance Record */}
            <Card className="mt-6 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Attendance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Attendance Percentage</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-green-600 h-full transition-all"
                      style={{ width: `${Math.round((presentCount / attendance.length) * 100)}%` }}
                    />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                    {Math.round((presentCount / attendance.length) * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Absence Percentage</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-red-600 h-full transition-all"
                      style={{ width: `${Math.round((absentCount / attendance.length) * 100)}%` }}
                    />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                    {Math.round((absentCount / attendance.length) * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Late Percentage</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-yellow-600 h-full transition-all"
                      style={{ width: `${Math.round((lateCount / attendance.length) * 100)}%` }}
                    />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                    {Math.round((lateCount / attendance.length) * 100)}%
                  </p>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
