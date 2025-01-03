'use client'

import { useState } from "react"
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { IoMicOutline } from "react-icons/io5"

type ChatHistory = {
  id: string;
  title: string;
}

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'Previous Chat 1' },
    { id: '2', title: 'Previous Chat 2' },
    { id: '3', title: 'Previous Chat 3' },
  ])
  const [activeChat, setActiveChat] = useState<string | null>(null)
  
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      { id: 'initial', role: 'assistant', content: "Hello! How can I assist you today?" }
    ]
  })

  const startNewChat = () => {
    const newChatId = Date.now().toString()
    setChatHistory([{ id: newChatId, title: 'New Chat' }, ...chatHistory])
    setActiveChat(newChatId)
    // Reset the chat messages here
  }

  const startVoiceInput = () => {
    // Logic to start voice input (this can be implemented as needed)
    console.log("Voice input activated")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat History Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <Button onClick={startNewChat} className="w-full mb-4">New Chat</Button>
        <ScrollArea className="h-[calc(100vh-100px)]">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "p-2 mb-2 rounded cursor-pointer hover:bg-gray-100",
                activeChat === chat.id && "bg-blue-100"
              )}
              onClick={() => setActiveChat(chat.id)}
            >
              {chat.title}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white shadow-lg rounded-xl">
        <Card className="w-full max-w-3xl flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Banglish to Bangla Chatbot</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-auto">
            <ScrollArea className="h-full pr-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "inline-block p-3 rounded-lg max-w-[80%] text-sm",
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="sticky bottom-0 bg-white z-10 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent form default submission
                handleSubmit(e);
              }}
              className="flex w-full space-x-2 items-center"
            >
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={startVoiceInput}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                <IoMicOutline size={24} />
              </button>

              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                className="flex-grow px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
              
              {/* Send Button with rotated icon (90 degrees clockwise) */}
              <Button
                type="submit"
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                <span className="text-2xl transform rotate 90">➤</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
