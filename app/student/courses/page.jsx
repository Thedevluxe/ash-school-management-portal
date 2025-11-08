"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

const studentNavItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: BookOpen },
  { label: "Courses", href: "/student/courses", icon: BookOpen },
  { label: "Results", href: "/student/results", icon: "TrendingUp" },
  { label: "Payments", href: "/student/payments", icon: "CreditCard" },
  { label: "Timetable", href: "/student/timetable", icon: "Calendar" },
  { label: "Documents", href: "/student/documents", icon: "FileText" },
]

export default function StudentCourses() {
  const [courses, setCourses] = useState([
    { id: 1, code: "CS301", title: "Database Systems", lecturer: "Prof. Adams", units: 3, status: "registered" },
    { id: 2, code: "CS305", title: "Web Development", lecturer: "Dr. Smith", units: 4, status: "registered" },
    { id: 3, code: "CS310", title: "Software Engineering", lecturer: "Prof. Brown", units: 3, status: "registered" },
  ])

  const [availableCourses] = useState([
    { id: 4, code: "CS320", title: "Mobile Development", lecturer: "Dr. Johnson", units: 3 },
    { id: 5, code: "CS330", title: "Cloud Computing", lecturer: "Prof. Williams", units: 4 },
    { id: 6, code: "CS340", title: "AI & Machine Learning", lecturer: "Dr. Davis", units: 4 },
  ])

  const handleDropCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id))
  }

  return (
    <ProtectedRoute requiredRole="student">
      <div className="flex">
        <Sidebar role="student" items={studentNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Courses" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Registered Courses */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Registered Courses</h2>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Total Units: <span className="font-bold text-slate-900 dark:text-white">10</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className="p-6 border-blue-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-600">{course.code}</p>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{course.title}</h3>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Lecturer: {course.lecturer}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Units: {course.units}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">View Materials</Button>
                      <Button
                        onClick={() => handleDropCourse(course.id)}
                        variant="outline"
                        className="border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Courses */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Available Courses to Register</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{course.code}</p>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{course.title}</h3>
                      </div>
                      <AlertCircle className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Lecturer: {course.lecturer}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Units: {course.units}</p>
                    </div>
                    <Button
                      onClick={() => setCourses([...courses, { ...course, status: "registered" }])}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Register
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
