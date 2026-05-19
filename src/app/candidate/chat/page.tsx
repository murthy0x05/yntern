"use client";

import { useState, useEffect } from "react";
import { db } from "@/utils/firebase/client";
import { collection, getDocs, addDoc, query, orderBy, doc } from "firebase/firestore";

const QUICK_REPLIES = [
  "I'm interested!",
  "Tell me more about the role",
  "What's the compensation?",
  "Not right now, thanks",
];

export default function ChatPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chats"));
        
        const chatsData = await Promise.all(
          querySnapshot.docs.map(async (chatDoc) => {
            const chat = chatDoc.data();
            const msgsSnap = await getDocs(query(collection(db, "chats", chatDoc.id, "messages"), orderBy("created_at")));
            const msgs = msgsSnap.docs.map(m => m.data());
            
            const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;

            return {
              id: chatDoc.id,
              company: chat.company || "Unknown",
              role: chat.role || "Unknown",
              recruiterName: "AI Recruiter",
              initials: chat.initials || "??",
              unread: 0, // Mock unread
              lastMessage: lastMsg ? lastMsg.text : "No messages yet.",
              lastTime: lastMsg ? lastMsg.time : "",
              messages: msgs,
            };
          })
        );
        
        setConversations(chatsData);
        if (chatsData.length > 0) {
          setActiveId(chatsData[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };
    fetchChats();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !activeId) return;

    try {
      const newMessage = {
        sender: "candidate",
        text: inputValue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        created_at: new Date().toISOString()
      };
      
      await addDoc(collection(db, "chats", activeId, "messages"), newMessage);

      setConversations(prev => prev.map(c => {
        if (c.id === activeId) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: newMessage.text,
            lastTime: newMessage.time
          };
        }
        return c;
      }));
      setInputValue("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const active = conversations.find((c) => c.id === activeId);

  if (!active) {
    return (
      <div className="flex-1 flex h-[calc(100vh-56px)] overflow-hidden items-center justify-center">
        <p className="font-[Inter] text-sm text-[#848484]">Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Left Panel — Conversation List */}
      <div className="w-[340px] border-r border-[#cfc4c5] bg-white overflow-y-auto shrink-0">
        <div className="p-4 border-b border-[#cfc4c5]/30">
          <h2
            className="text-black mb-1"
            style={{
              fontFamily: "'Instrument Serif'",
              fontSize: "24px",
              lineHeight: "1.2",
            }}
          >
            Messages
          </h2>
          <p className="font-[Inter] text-[12px] text-[#848484]">
            {conversations.length} conversations
          </p>
        </div>
        <div className="flex flex-col">
          {conversations.map((c) => (
            <button
              key={c.id}
              className={`w-full flex items-start gap-3 p-4 text-left transition-all duration-300 cursor-pointer border-b border-[#cfc4c5]/15 ${activeId === c.id ? "bg-[#f3f3f3]" : "hover:bg-[#fafafa]"}`}
              onClick={() => setActiveId(c.id)}
              type="button"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-semibold shrink-0 ${activeId === c.id ? "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white" : "bg-[#eeeeee] text-[#4c4546]"}`}
              >
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-[Inter] text-[13px] font-semibold text-black truncate">
                    {c.company}
                  </p>
                  <span className="font-[Inter] text-[11px] text-[#848484] shrink-0 ml-2">
                    {c.lastTime}
                  </span>
                </div>
                <p className="font-[Inter] text-[12px] text-[#4c4546] truncate">
                  {c.role}
                </p>
                <p className="font-[Inter] text-[11px] text-[#848484] truncate mt-0.5">
                  {c.lastMessage}
                </p>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white flex items-center justify-center font-[Inter] text-[10px] font-bold shrink-0 mt-1">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel — Chat Thread */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-[#cfc4c5]/30 bg-white flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[13px] font-semibold">
            {active.initials}
          </div>
          <div>
            <p className="font-[Inter] text-[14px] font-semibold text-black">
              {active.company}
            </p>
            <p className="font-[Inter] text-[12px] text-[#4c4546]">
              {active.role}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#f5f3ff] text-[#8b5cf6] rounded-full font-[Inter] text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">
                smart_toy
              </span>
              AI Outreach
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
          {active.messages.map((msg: any, i: number) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.sender === "ai" ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${msg.sender === "ai" ? "bg-[#f5f3ff] text-[#8b5cf6]" : "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white"}`}
              >
                {msg.sender === "ai" ? (
                  <span className="material-symbols-outlined text-[14px]">
                    smart_toy
                  </span>
                ) : (
                  "PK"
                )}
              </div>
              <div className="flex flex-col gap-1 max-w-[75%]">
                <div
                  className={`px-4 py-2.5 rounded-2xl font-[Inter] text-[13px] leading-relaxed ${msg.sender === "ai" ? "bg-white border border-[#e0e7ff] text-black rounded-tl-sm" : "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-tr-sm"}`}
                >
                  {msg.text}
                </div>
                <span
                  className={`font-[Inter] text-[10px] text-[#848484] ${msg.sender === "ai" ? "ml-1" : "mr-1 text-right"}`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="px-6 pb-2 flex flex-wrap gap-2">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              className="px-3.5 py-1.5 border border-[#cfc4c5] rounded-full font-[Inter] text-[12px] text-[#4c4546] hover:border-[#6366f1] hover:text-[#6366f1] hover:bg-[#f5f3ff] transition-all cursor-pointer"
              onClick={() => setInputValue(reply)}
              type="button"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="px-6 py-4 border-t border-[#cfc4c5]/30 bg-white">
          <div className="flex items-center gap-3">
            <input
              className="flex-1 bg-[#f3f3f3] border border-[#cfc4c5]/30 rounded-full py-2.5 px-4 text-sm font-[Inter] focus:outline-none focus:border-[#6366f1] focus:bg-white transition-all placeholder:text-[#848484]"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your reply..."
              type="text"
              value={inputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
              onClick={handleSendMessage}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                send
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
