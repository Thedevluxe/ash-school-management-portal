"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, TrendingUp, FileText, MessageSquare, Send, Paperclip, Smile, Search } from "lucide-react"
import { useState } from "react"

const lecturerNavItems = [
  { label: "Dashboard", href: "/lecturer/dashboard", icon: BookOpen },
  { label: "Attendance", href: "/lecturer/attendance", icon: Users },
  { label: "Results", href: "/lecturer/results", icon: TrendingUp },
  { label: "Materials", href: "/lecturer/materials", icon: FileText },
  { label: "Students", href: "/lecturer/students", icon: Users },
  { label: "Messages", href: "/lecturer/messages", icon: MessageSquare },
]

export default function LecturerMessages() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [messageText, setMessageText] = useState("")
  const [chats] = useState([
    {
      id: 1,
      name: "Ahmed Ali",
      studentId: "STU001",
      course: "Web Development",
      avatar: "👨‍🎓",
      online: true,
      lastMessage: "Thank you for the feedback",
      unread: 0,
    },
    {
      id: 2,
      name: "Fatima Hassan",
      studentId: "STU002",
      course: "Web Development",
      avatar: "👩‍🎓",
      online: false,
      lastMessage: "Can I submit late?",
      unread: 1,
    },
    {
      id: 3,
      name: "Class Group",
      type: "group",
      course: "Database Systems",
      avatar: "👥",
      online: true,
      lastMessage: "See you in class tomorrow",
      unread: 3,
    },
  ])

  const [messages, setMessages] = useState([
    { id: 1, sender: "Ahmed Ali", text: "Thank you for the feedback on my assignment", time: "3:15 PM", isOwn: false },
    { id: 2, sender: "You", text: "You're welcome! Great work on the implementation.", time: "3:18 PM", isOwn: true },
    {
      id: 3,
      sender: "Ahmed Ali",
      text: "I'll apply those suggestions for the next one",
      time: "3:20 PM",
      isOwn: false,
    },
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
    <ProtectedRoute requiredRole="lecturer">
      <div className="flex">
        <Sidebar role="lecturer" items={lecturerNavItems} />

        <div className="flex-1 lg:ml-0">
          <Header title="Messages" />

          <main className="p-6 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Chat List */}
              <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Messages</h2>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search messages..."
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
                        selectedChat === chat.id
                          ? "bg-purple-50 dark:bg-purple-900/20 border-l-4 border-l-purple-600"
                          : ""
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
                          <span className="flex-shrink-0 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
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
                        {currentChat.type === "group" ? (
                          <>
                            <Users className="w-4 h-4" />
                            Group Chat
                          </>
                        ) : (
                          <>
                            <span
                              className={`w-2 h-2 rounded-full ${currentChat.online ? "bg-green-500" : "bg-slate-400"}`}
                            />
                            {currentChat.online ? "Online" : "Offline"}
                          </>
                        )}
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
                              ? "bg-purple-600 text-white rounded-br-none"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none"
                          }`}
                        >
                          {!msg.isOwn && currentChat.type === "group" && (
                            <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                          )}
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${msg.isOwn ? "text-purple-100" : "text-slate-600 dark:text-slate-400"}`}
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
                      <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700 text-white">
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
