"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BookOpen, Users, BarChart3, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <nav className="border-b border-blue-100 dark:border-slate-800 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">EduPortal</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-slate-800 bg-transparent"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white text-balance">
            Streamline Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Academic Journey
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-balance">
            A comprehensive school management platform designed for students, lecturers, and administrators to
            collaborate seamlessly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg group">
                Start for Free <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-slate-800 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
          <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Course Management</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Register and manage your courses with ease</p>
        </Card>
        <Card className="p-6 border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
          <BarChart3 className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Performance Tracking</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Monitor academic progress with real-time analytics
          </p>
        </Card>
        <Card className="p-6 border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
          <Users className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Collaboration</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Connect with peers and instructors in real-time</p>
        </Card>
        <Card className="p-6 border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
          <Shield className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Secure & Safe</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Enterprise-grade security for your data</p>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>&copy; 2025 EduPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
