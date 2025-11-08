"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, DollarSign, Settings, FileText, BarChart3, Plus, Edit, Trash2, Search } from "lucide-react"
import { useState } from "react"

const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Lecturers", href: "/admin/lecturers", icon: Users },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Payments", href: "/admin/payments", icon: DollarSign },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export default function ManageStudents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [students, setStudents] = useState([
    {
      id: 1,
      matricNo: "STU001",
      name: "Ahmed Ali",
      email: "ahmed@university.edu",
      department: "CS",
      status: "active",
      enrolledCourses: 5,
    },
    {
      id: 2,
      matricNo: "STU002",
      name: "Fatima Hassan",
      email: "fatima@university.edu",
      department: "CS",
      status: "active",
      enrolledCourses: 6,
    },
    {
      id: 3,
      matricNo: "STU003",
      name: "Ibrahim Oluwale",
      email: "ibrahim@university.edu",
      department: "ENG",
      status: "inactive",
      enrolledCourses: 0,
    },
    {
      id: 4,
      matricNo: "STU004",
      name: "Zainab Muhammad",
      email: "zainab@university.edu",
      department: "BUS",
      status: "active",
      enrolledCourses: 4,
    },
    {
      id: 5,
      matricNo: "STU005",
      name: "Chisom Okafor",
      email: "chisom@university.edu",
      department: "CS",
      status: "active",
      enrolledCourses: 5,
    },
  ])

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.matricNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex">
        <Sidebar role="admin" items={adminNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Manage Students" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Student Management</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" /> Add New Student
              </Button>
            </div>

            {/* Search and Stats */}
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, matric number, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{students.length}</p>
                </Card>
                <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {students.filter((s) => s.status === "active").length}
                  </p>
                </Card>
                <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Inactive</p>
                  <p className="text-2xl font-bold text-red-600">
                    {students.filter((s) => s.status === "inactive").length}
                  </p>
                </Card>
                <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Departments</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">5</p>
                </Card>
              </div>
            </div>

            {/* Students Table */}
            <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Matric No.</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Department</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Courses</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Actions</th>
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
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{student.email}</td>
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{student.department}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{student.enrolledCourses}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              student.status === "active"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                            }`}
                          >
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => handleDelete(student.id)}
                              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
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
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
