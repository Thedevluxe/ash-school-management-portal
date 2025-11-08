"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, TrendingUp, FileText, Download, Award } from "lucide-react"
import { useState } from "react"

const studentNavItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: BookOpen },
  { label: "Courses", href: "/student/courses", icon: BookOpen },
  { label: "Results", href: "/student/results", icon: TrendingUp },
  { label: "Payments", href: "/student/payments", icon: "CreditCard" },
  { label: "Timetable", href: "/student/timetable", icon: "Calendar" },
  { label: "Documents", href: "/student/documents", icon: FileText },
]

export default function StudentResults() {
  const [selectedSemester, setSelectedSemester] = useState("fall-2024")
  const [results] = useState([
    {
      courseCode: "CS301",
      courseTitle: "Database Systems",
      creditUnits: 3,
      score: 85,
      grade: "A",
      points: 4.0,
      status: "completed",
    },
    {
      courseCode: "CS305",
      courseTitle: "Web Development",
      creditUnits: 4,
      score: 92,
      grade: "A",
      points: 4.0,
      status: "completed",
    },
    {
      courseCode: "CS310",
      courseTitle: "Software Engineering",
      creditUnits: 3,
      score: 78,
      grade: "B+",
      points: 3.3,
      status: "completed",
    },
    {
      courseCode: "CS320",
      courseTitle: "Mobile Development",
      creditUnits: 4,
      score: 88,
      grade: "A",
      points: 4.0,
      status: "completed",
    },
    {
      courseCode: "MATH201",
      courseTitle: "Discrete Mathematics",
      creditUnits: 3,
      score: 81,
      grade: "A-",
      points: 3.7,
      status: "completed",
    },
  ])

  const semesters = [
    { id: "fall-2024", label: "Fall 2024", year: "2024/2025" },
    { id: "spring-2024", label: "Spring 2024", year: "2023/2024" },
    { id: "fall-2023", label: "Fall 2023", year: "2023/2024" },
  ]

  const calculateGPA = () => {
    const totalPoints = results.reduce((sum, r) => sum + r.points * r.creditUnits, 0)
    const totalUnits = results.reduce((sum, r) => sum + r.creditUnits, 0)
    return (totalPoints / totalUnits).toFixed(2)
  }

  const calculateCGPA = () => 3.75

  return (
    <ProtectedRoute requiredRole="student">
      <div className="flex">
        <Sidebar role="student" items={studentNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Results" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Semester Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Select Semester</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {semesters.map((sem) => (
                  <button
                    key={sem.id}
                    onClick={() => setSelectedSemester(sem.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                      selectedSemester === sem.id
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-blue-600"
                    }`}
                  >
                    {sem.label}
                  </button>
                ))}
              </div>
            </div>

            {/* GPA Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Semester GPA</p>
                    <p className="text-3xl font-bold text-blue-600">{calculateGPA()}</p>
                  </div>
                  <Award className="w-10 h-10 text-blue-100 dark:text-blue-900" />
                </div>
              </Card>

              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Cumulative GPA</p>
                    <p className="text-3xl font-bold text-green-600">{calculateCGPA()}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-100 dark:text-green-900" />
                </div>
              </Card>

              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Units</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {results.reduce((sum, r) => sum + r.creditUnits, 0)}
                    </p>
                  </div>
                  <BookOpen className="w-10 h-10 text-purple-100 dark:text-purple-900" />
                </div>
              </Card>
            </div>

            {/* Academic Standing */}
            <Card className="mb-6 p-4 border-green-200 dark:border-slate-800 bg-green-50 dark:bg-slate-900 border-l-4 border-l-green-600">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300">Good Academic Standing</p>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Your academic performance is excellent. Keep up the great work!
                  </p>
                </div>
              </div>
            </Card>

            {/* Results Table */}
            <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Course Results</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="w-4 h-4 mr-2" /> Download Transcript
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Course Code</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Course Title</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Units</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Score</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Grade</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{result.courseCode}</td>
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{result.courseTitle}</td>
                        <td className="text-center py-3 px-4 text-slate-600 dark:text-slate-400">
                          {result.creditUnits}
                        </td>
                        <td className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          {result.score}%
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            {result.grade}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          {result.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Grade Scale */}
            <Card className="mt-6 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Grading Scale</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { grade: "A", points: "4.0", range: "90-100" },
                  { grade: "A-", points: "3.7", range: "85-89" },
                  { grade: "B+", points: "3.3", range: "80-84" },
                  { grade: "B", points: "3.0", range: "75-79" },
                  { grade: "C", points: "2.0", range: "70-74" },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{item.grade}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{item.points}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{item.range}</p>
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
