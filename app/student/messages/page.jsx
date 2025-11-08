"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, TrendingUp, FileText, CreditCard, Send, Paperclip, Smile, Search } from "lucide-react"
import { useState } from "react"

const studentNavItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: BookOpen },
  { label: "Courses", href: "/student/courses", icon: BookOpen },
  { label: "Results", href: "/student/results", icon: TrendingUp },
  { label: "Payments", href: "/student/payments", icon: CreditCard },
  { label: "Timetable", href: "/student/timetable", icon: "Calendar" },
  { label: "Documents", href: "/student/documents", icon: FileText },
]

export default function StudentMessages() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [messageText, setMessageText] = useState("")
  const [chats] = useState([
    {
      id: 1,
      name: "Dr. Smith",
      role: "Lecturer",
      course: "Web Development",
      avatar: "👨‍🏫",
      online: true,
      lastMessage: "Have you submitted the assignment?",
      unread: 2,
    },
    {
      id: 2,
      name: "Prof. Adams",
      role: "Lecturer",
      course: "Database Systems",
      avatar: "👨‍🏫",
      online: false,
      lastMessage: "Your grade has been posted",
      unread: 0,
    },
    {
      id: 3,
      name: "Admin Support",
      role: "Administration",
      course: "General",
      avatar: "🔑",
      online: true,
      lastMessage: "How can we help you?",
      unread: 0,
    },
  ])

  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Smith", text: "Hi Ahmed, have you finished the assignment?", time: "10:30 AM", isOwn: false },
    {
      id: 2,
      sender: "You",
      text: "Yes, I'm working on it. Should be done by tomorrow.",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Dr. Smith",
      text: "Great! Remember to test your code thoroughly.",
      time: "10:35 AM",
      isOwn: false,
    },
    { id: 4, sender: "Dr. Smith", text: "Have you submitted the assignment?", time: "2:15 PM", isOwn: false },
  ])

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          text: messageText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOwn: true,
        },
      ])
      setMessageText("")
    }
  }

  const currentChat = chats.find((c) => c.id === selectedChat)

  return (
    <ProtectedRoute requiredRole="student">
      <div className="flex">
        <Sidebar role="student" items={studentNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Messages" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Chat List */}
              <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Conversations</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`w-full p-4 border-b border-slate-100 dark:border-slate-800 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        selectedChat === chat.id ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <span className="text-2xl">{chat.avatar}</span>
                          {chat.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{chat.name}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{chat.course}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-1">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Chat Area */}
              {currentChat && (
                <Card className="md:col-span-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <span className="text-3xl">{currentChat.avatar}</span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{currentChat.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <span
                          className={`w-2 h-2 rounded-full ${currentChat.online ? "bg-green-500" : "bg-slate-400"}`}
                        />
                        {currentChat.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.isOwn
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${msg.isOwn ? "text-blue-100" : "text-slate-600 dark:text-slate-400"}`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex gap-3">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                        <Paperclip className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </button>
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                      />
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                        <Smile className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </button>
                      <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
