"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, CreditCard, TrendingUp, FileText, Check, AlertCircle, Download, Plus } from "lucide-react"
import { useState } from "react"

const studentNavItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: BookOpen },
  { label: "Courses", href: "/student/courses", icon: BookOpen },
  { label: "Results", href: "/student/results", icon: TrendingUp },
  { label: "Payments", href: "/student/payments", icon: CreditCard },
  { label: "Timetable", href: "/student/timetable", icon: "Calendar" },
  { label: "Documents", href: "/student/documents", icon: FileText },
]

export default function StudentPayments() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      description: "Tuition Fee - Fall 2024",
      amount: 150000,
      dueDate: "2024-09-30",
      status: "paid",
      paidDate: "2024-09-28",
      reference: "PAY-2024-001",
    },
    {
      id: 2,
      description: "Tuition Fee - Spring 2024",
      amount: 150000,
      dueDate: "2024-03-31",
      status: "paid",
      paidDate: "2024-03-29",
      reference: "PAY-2024-002",
    },
    {
      id: 3,
      description: "Registration Fee",
      amount: 25000,
      dueDate: "2024-09-01",
      status: "paid",
      paidDate: "2024-08-31",
      reference: "PAY-2024-003",
    },
    {
      id: 4,
      description: "Library Fee",
      amount: 10000,
      dueDate: "2024-09-15",
      status: "overdue",
      paidDate: null,
      reference: null,
    },
  ])

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      description: "Fall 2024 Invoice",
      totalAmount: 185000,
      issueDate: "2024-08-01",
      dueDate: "2024-09-30",
      status: "paid",
    },
    {
      id: 2,
      description: "Spring 2024 Invoice",
      totalAmount: 185000,
      issueDate: "2024-02-01",
      dueDate: "2024-03-31",
      status: "paid",
    },
  ])

  const handlePayment = (paymentId) => {
    // In a real app, this would initiate Paystack integration
    alert("Redirecting to payment gateway...")
  }

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter((p) => p.status !== "paid").reduce((sum, p) => sum + p.amount, 0)

  return (
    <ProtectedRoute requiredRole="student">
      <div className="flex">
        <Sidebar role="student" items={studentNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Payments" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Payment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Paid</p>
                    <p className="text-2xl font-bold text-green-600">₦{totalPaid.toLocaleString()}</p>
                  </div>
                  <Check className="w-10 h-10 text-green-100 dark:text-green-900" />
                </div>
              </Card>

              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Amount Due</p>
                    <p className="text-2xl font-bold text-red-600">₦{totalPending.toLocaleString()}</p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-red-100 dark:text-red-900" />
                </div>
              </Card>

              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Invoiced</p>
                    <p className="text-2xl font-bold text-blue-600">₦{(totalPaid + totalPending).toLocaleString()}</p>
                  </div>
                  <CreditCard className="w-10 h-10 text-blue-100 dark:text-blue-900" />
                </div>
              </Card>
            </div>

            {/* Payment Records */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Payment Records</h2>
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          Description
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Due Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Reference</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <td className="py-3 px-4 text-slate-900 dark:text-white">{payment.description}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                            ₦{payment.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            {new Date(payment.dueDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                payment.status === "paid"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                              }`}
                            >
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{payment.reference || "-"}</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              {payment.status !== "paid" ? (
                                <Button
                                  size="sm"
                                  onClick={() => handlePayment(payment.id)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <Plus className="w-4 h-4 mr-1" /> Pay
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-300 dark:border-slate-700 bg-transparent"
                                >
                                  <Download className="w-4 h-4 mr-1" /> Receipt
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Invoices */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Invoices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {invoices.map((invoice) => (
                  <Card
                    key={invoice.id}
                    className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{invoice.description}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Issued: {new Date(invoice.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          invoice.status === "paid"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        }`}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-600 dark:text-slate-400">Total Amount</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          ₦{invoice.totalAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="w-4 h-4 mr-2" /> Download Invoice
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
