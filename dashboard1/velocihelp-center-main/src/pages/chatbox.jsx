import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send, Sun, Moon } from "lucide-react";

const BOT_RESPONSES = [
  // Greetings & Small Talk
  { keywords: ["hello", "hi", "hey"], response: "Hello! How can I assist you today?" },
  { keywords: ["how are you"], response: "I'm here to assist you 24/7! How can I help?" },
  { keywords: ["what's up", "sup"], response: "Just here to help! What do you need assistance with?" },
  { keywords: ["thank you", "thanks"], response: "You're welcome! Let me know if you need anything else." },
  { keywords: ["bye", "goodbye"], response: "Goodbye! Drive safe!" },

  // Roadside Assistance
  { keywords: ["assistance", "help"], response: "We offer roadside assistance services. What do you need help with?" },
  { keywords: ["mechanic", "repair"], response: "We can connect you with a nearby mechanic. What's the issue?" },
  { keywords: ["battery", "jumpstart", "won't start"], response: "If your battery is dead, we can send a jumpstart service to your location." },
  { keywords: ["tire", "flat", "puncture"], response: "A flat tire? No worries! We can send a technician to replace or repair it." },
  { keywords: ["fuel", "empty", "out of gas"], response: "Out of fuel? We can deliver fuel to your location!" },
  { keywords: ["tow", "towing", "breakdown"], response: "Need towing? We can dispatch a tow truck to assist you." },
  { keywords: ["locked out", "keys inside"], response: "Locked out of your car? We can send a locksmith to help you." },

  // Emergency & Safety
  { keywords: ["accident", "crash"], response: "If you've been in an accident, please call emergency services. I can also connect you to a tow truck or mechanic." },
  { keywords: ["stuck", "stranded"], response: "If you're stranded, I can help locate the nearest assistance service for you." },
  { keywords: ["police", "theft"], response: "If you're in danger, please call emergency services immediately!" },

  // Vehicle Information & Tips
  { keywords: ["oil change", "engine oil"], response: "Changing your engine oil regularly is important! Would you like help finding a nearby service?" },
  { keywords: ["air pressure", "tire pressure"], response: "Keeping the right tire pressure improves safety and mileage. Need assistance checking it?" },
  { keywords: ["check engine", "engine warning"], response: "A check engine light could indicate many things. Would you like to find a mechanic near you?" },

  // Miscellaneous
  { keywords: ["who are you", "what are you"], response: "I'm your roadside assistance chatbot, here to help with any vehicle-related issues!" },
  { keywords: ["what services do you offer"], response: "We provide jumpstart, towing, fuel delivery, tire replacement, and locksmith services." },
  { keywords: ["where are you located"], response: "We operate in multiple locations. Please share your location to find the nearest assistance service." },
  { keywords: ["can I speak to a human"], response: "I can assist you with most queries, but I can also connect you to a human if needed." },
  { keywords: ["do you charge for services"], response: "Service charges depend on the type of assistance needed. Would you like more details?" },
  { keywords: ["discount", "offers"], response: "We occasionally offer discounts! Would you like to check our latest offers?" }
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: "bot-welcome", content: "Hello! How can I assist you today?", role: "assistant" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    for (const { keywords, response } of BOT_RESPONSES) {
      if (keywords.some((word) => lowerInput.includes(word))) {
        return response;
      }
    }
    return "I'm not sure about that. Can you provide more details?";
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: crypto.randomUUID(), content: input, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = { id: crypto.randomUUID(), content: getBotResponse(input), role: "assistant" };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`h-screen flex flex-col items-center justify-center bg-${darkMode ? "gray-900" : "gray-100"} transition-all`}>
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h2 className="text-lg font-semibold">Chat Assistant</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-blue-700 rounded-full">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs px-4 py-2 rounded-xl shadow-md text-white ${msg.role === "user" ? "bg-blue-500" : "bg-gray-700"}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-4 border-t bg-white dark:bg-gray-800 flex">
        <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type a message..."
    className="flex-1 p-4 pr-14 rounded-full shadow-md text-black dark:text-white bg-gray-100 dark:bg-gray-800 
      outline-none transition-all duration-300 ease-in-out border-2 border-transparent 
      focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 focus:border-blue-500 dark:focus:border-blue-500 
      hover:shadow-lg hover:scale-[1.02] placeholder-gray-500 dark:placeholder-gray-400"
  />

  {/* Animated Send Button */}
  <button
  type="submit"
  className="ml-2 p-3 bg-gradient-to-r from-blue-500 to-indigo-500 
    text-white rounded-full transition-all duration-300 ease-in-out 
    hover:from-indigo-600 hover:to-blue-600 hover:scale-105 active:scale-95 shadow-md"
>
  <Send className="h-5 w-5 animate-fade-in" />
</button>

        </form>
      </div>
    </div>
  );
};

export default Chatbot;
