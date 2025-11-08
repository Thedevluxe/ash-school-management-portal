"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, TrendingUp, FileText, MessageSquare, Upload, Download } from "lucide-react"
import { useState } from "react"

const lecturerNavItems = [
  { label: "Dashboard", href: "/lecturer/dashboard", icon: BookOpen },
  { label: "Attendance", href: "/lecturer/attendance", icon: Users },
  { label: "Results", href: "/lecturer/results", icon: TrendingUp },
  { label: "Materials", href: "/lecturer/materials", icon: FileText },
  { label: "Students", href: "/lecturer/students", icon: Users },
  { label: "Messages", href: "/lecturer/messages", icon: MessageSquare },
]

export default function LecturerResults() {
  const [selectedCourse, setSelectedCourse] = useState("CS301")
  const [grades, setGrades] = useState([
    { id: 1, matricNo: "STU001", name: "Ahmed Ali", coursework: 35, exam: 65, total: 80, grade: "B+" },
    { id: 2, matricNo: "STU002", name: "Fatima Hassan", coursework: 40, exam: 72, total: 92, grade: "A" },
    { id: 3, matricNo: "STU003", name: "Ibrahim Oluwale", coursework: 28, exam: 55, total: 68, grade: "C" },
    { id: 4, matricNo: "STU004", name: "Zainab Muhammad", coursework: 38, exam: 68, total: 85, grade: "A" },
    { id: 5, matricNo: "STU005", name: "Chisom Okafor", coursework: 36, exam: 70, total: 82, grade: "B+" },
  ])

  const courses = [
    { id: "CS301", code: "CS301", title: "Database Systems" },
    { id: "CS305", code: "CS305", title: "Web Development" },
    { id: "CS310", code: "CS310", title: "Software Engineering" },
    { id: "CS320", code: "CS320", title: "Mobile Development" },
  ]

  const handleGradeUpdate = (id, field, value) => {
    setGrades(
      grades.map((g) => {
        if (g.id === id) {
          const updated = { ...g, [field]: Number.parseInt(value) || 0 }
          if (field === "coursework" || field === "exam") {
            updated.total = updated.coursework + updated.exam
            updated.grade = calculateGrade(updated.total)
          }
          return updated
        }
        return g
      }),
    )
  }

  const calculateGrade = (score) => {
    if (score >= 90) return "A"
    if (score >= 85) return "A-"
    if (score >= 80) return "B+"
    if (score >= 75) return "B"
    if (score >= 70) return "C"
    if (score >= 60) return "D"
    return "F"
  }

  return (
    <ProtectedRoute requiredRole="lecturer">
      <div className="flex">
        <Sidebar role="lecturer" items={lecturerNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Results Management" />

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
                    <p className="font-semibold text-slate-900 dark:text-white">{course.code}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{course.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex gap-3 flex-wrap">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Upload className="w-4 h-4 mr-2" /> Upload CSV
              </Button>
              <Button variant="outline" className="border-purple-300 dark:border-purple-700 bg-transparent">
                <Download className="w-4 h-4 mr-2" /> Download Template
              </Button>
              <Button variant="outline" className="border-purple-300 dark:border-purple-700 bg-transparent">
                <Download className="w-4 h-4 mr-2" /> Export Results
              </Button>
            </div>

            {/* Results Table */}
            <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Enter Student Grades</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Matric No.</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Student Name</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        Coursework (40%)
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Exam (60%)</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Total</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((grade) => (
                      <tr
                        key={grade.id}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{grade.matricNo}</td>
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{grade.name}</td>
                        <td className="text-center py-3 px-4">
                          <input
                            type="number"
                            min="0"
                            max="40"
                            value={grade.coursework}
                            onChange={(e) => handleGradeUpdate(grade.id, "coursework", e.target.value)}
                            className="w-16 px-2 py-1 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center"
                          />
                        </td>
                        <td className="text-center py-3 px-4">
                          <input
                            type="number"
                            min="0"
                            max="60"
                            value={grade.exam}
                            onChange={(e) => handleGradeUpdate(grade.id, "exam", e.target.value)}
                            className="w-16 px-2 py-1 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center"
                          />
                        </td>
                        <td className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          {grade.total}
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            {grade.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Save Results</Button>
                <Button variant="outline" className="border-slate-300 dark:border-slate-700 bg-transparent">
                  Reset
                </Button>
              </div>
            </Card>

            {/* Grade Statistics */}
            <Card className="mt-6 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Grade Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { grade: "A (90+)", count: 1 },
                  { grade: "B+ (80-89)", count: 2 },
                  { grade: "B (75-79)", count: 1 },
                  { grade: "C (70-74)", count: 0 },
                  { grade: "Below C", count: 1 },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{item.count}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.grade}</p>
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
