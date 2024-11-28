"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "@/models/message.model";
import { useChatStore } from "@/stores";
import { Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";
import { OnlineDot } from "./online-dot";

export function MainChat() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! How are you?",
      sender: "other",
      timestamp: new Date(),
    },
  ]);

  const { activeContact } = useChatStore((state) => state);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: `${Date.now()}`,
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex-grow flex flex-col">
      {/* Chat Header */}
      {activeContact && (
        <div className="p-4 border-b flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white">
            {activeContact.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold">{activeContact.name}</h3>
            <div className="flex items-center gap-2">
              <OnlineDot />
              <p className="text-gray-500 text-sm">Online</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Area */}
      <div className="p-4 border-t flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Smile className="h-5 w-5" />
        </Button>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-grow"
        />
        <Button onClick={handleSendMessage} size="icon">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
