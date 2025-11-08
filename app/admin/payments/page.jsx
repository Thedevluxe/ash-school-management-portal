"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Users, BookOpen, DollarSign, Settings, FileText, BarChart3, Check, X, Search } from "lucide-react"
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

export default function AdminPayments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [payments, setPayments] = useState([
    {
      id: 1,
      reference: "PAY-2024-001",
      student: "Ahmed Ali",
      amount: 150000,
      date: "2024-09-28",
      status: "verified",
      paymentMethod: "Card",
    },
    {
      id: 2,
      reference: "PAY-2024-002",
      student: "Fatima Hassan",
      amount: 150000,
      date: "2024-09-27",
      status: "verified",
      paymentMethod: "Transfer",
    },
    {
      id: 3,
      reference: "PAY-2024-003",
      student: "Ibrahim Oluwale",
      amount: 150000,
      date: "2024-09-26",
      status: "pending",
      paymentMethod: "Card",
    },
    {
      id: 4,
      reference: "PAY-2024-004",
      student: "Zainab Muhammad",
      amount: 25000,
      date: "2024-09-25",
      status: "verified",
      paymentMethod: "Card",
    },
    {
      id: 5,
      reference: "PAY-2024-005",
      student: "Chisom Okafor",
      amount: 150000,
      date: "2024-09-24",
      status: "failed",
      paymentMethod: "Card",
    },
  ])

  const filteredPayments = payments.filter(
    (p) =>
      p.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleApprove = (id) => {
    setPayments(payments.map((p) => (p.id === id ? { ...p, status: "verified" } : p)))
  }

  const handleReject = (id) => {
    setPayments(payments.filter((p) => p.id !== id))
  }

  const totalVerified = payments.filter((p) => p.status === "verified").reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex">
        <Sidebar role="admin" items={adminNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Payment Management" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Verified</p>
                <p className="text-2xl font-bold text-green-600">₦{totalVerified.toLocaleString()}</p>
              </Card>
              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">₦{totalPending.toLocaleString()}</p>
              </Card>
              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Transactions</p>
                <p className="text-2xl font-bold text-blue-600">{payments.length}</p>
              </Card>
              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <p className="text-sm text-slate-600 dark:text-slate-400">Success Rate</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {Math.round((payments.filter((p) => p.status === "verified").length / payments.length) * 100)}%
                </p>
              </Card>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by student name or payment reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>
            </div>

            {/* Payments Table */}
            <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Reference</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Method</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{payment.reference}</td>
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{payment.student}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          ₦{payment.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{payment.paymentMethod}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              payment.status === "verified"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : payment.status === "pending"
                                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                            }`}
                          >
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            {payment.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(payment.id)}
                                  className="p-2 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                >
                                  <Check className="w-4 h-4 text-green-600" />
                                </button>
                                <button
                                  onClick={() => handleReject(payment.id)}
                                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                  <X className="w-4 h-4 text-red-600" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPayments.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">No payments found matching your search</p>
                </div>
              )}
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
