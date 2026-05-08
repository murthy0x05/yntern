"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";



export default function MessagesPage() {
  const [activeId, setActiveId] = useState(1);
  const [replyText, setReplyText] = useState("");
  const [chats, setChats] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await supabase
        .from("chats")
        .select("id, status, candidates(name), jobs(role), messages(sender, text, time, created_at)");

      if (data) {
        const formatted = data.map((chat: any) => {
          const msgs = chat.messages ? chat.messages.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) : [];
          const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
          const candidateName = chat.candidates?.name || "Unknown Candidate";
          const initials = candidateName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

          return {
            id: chat.id,
            name: candidateName,
            initials: initials,
            role: chat.jobs?.role || "Unknown Role",
            unread: chat.status === "Awaiting Review",
            lastMessage: lastMsg ? lastMsg.text : "No messages",
            time: lastMsg ? lastMsg.time : "",
            messages: msgs,
          };
        });
        setChats(formatted);
        if (formatted.length > 0) {
          setActiveId(formatted[0].id);
        }
      }
    };
    fetchChats();
  }, [supabase]);

  const handleSendMessage = async () => {
    if (!replyText.trim()) return;

    const { data, error } = await supabase.from("messages").insert({
      chat_id: activeId,
      sender: "ai",
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }).select();

    if (!error && data) {
      setChats(prev => prev.map(c => {
        if (c.id === activeId) {
          return {
            ...c,
            messages: [...c.messages, data[0]],
            lastMessage: data[0].text,
            time: data[0].time
          };
        }
        return c;
      }));
      setReplyText("");
    }
  };

  const active = chats.find((c) => c.id === activeId);

  if (!active) {
    return (
      <div className="flex-1 flex h-[calc(100vh-56px)] overflow-hidden items-center justify-center">
        <p className="font-[Inter] text-sm text-[#848484]">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Left Panel — Chat List */}
      <div className="w-[360px] border-r border-[#cfc4c5] bg-white overflow-y-auto shrink-0 flex flex-col">
        <div className="p-5 border-b border-[#cfc4c5]/30">
          <h2
            className="text-black mb-3"
            style={{
              fontFamily: "'Instrument Serif'",
              fontSize: "28px",
              lineHeight: "1.2",
            }}
          >
            Messages
          </h2>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#848484] text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-[#f9f9f9] border border-[#cfc4c5]/60 rounded-xl py-2 pl-9 pr-3 text-sm font-[Inter] focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]/30 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveId(chat.id)}
              className={`w-full flex items-start gap-3 p-4 text-left transition-all duration-300 cursor-pointer border-b border-[#cfc4c5]/15 ${activeId === chat.id ? "bg-[#f5f3ff]" : "hover:bg-[#fafafa]"}`}
            >
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-semibold shrink-0 ${activeId === chat.id ? "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white" : "bg-[#eeeeee] text-[#4c4546]"}`}
                >
                  {chat.initials}
                </div>
                {chat.unread && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#f43f5e] border-2 border-white rounded-full" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`font-[Inter] text-sm truncate ${chat.unread ? "font-bold text-black" : "font-semibold text-[#1b1b1b]"}`}>
                    {chat.name}
                  </p>
                  <span className={`font-[Inter] text-[11px] shrink-0 ${chat.unread ? "font-bold text-[#f43f5e]" : "text-[#848484]"}`}>
                    {chat.time}
                  </span>
                </div>
                <p className="font-[Inter] text-[12px] text-[#4c4546] mb-1 truncate">
                  {chat.role}
                </p>
                <p className={`font-[Inter] text-[12px] truncate ${chat.unread ? "font-semibold text-black" : "text-[#848484]"}`}>
                  {chat.lastMessage}
                </p>
              </div>
              {activeId === chat.id && (
                <div className="w-1 h-full bg-[#8b5cf6] absolute right-0 top-0 rounded-l-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel — Active Chat */}
      <div className="flex-1 flex flex-col bg-[#fafafa]">
        {/* Chat Header */}
        <div className="h-[72px] border-b border-[#cfc4c5]/30 bg-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
              {active.initials}
            </div>
            <div>
              <h3 className="font-[Inter] text-[15px] font-semibold text-black leading-tight">
                {active.name}
              </h3>
              <p className="font-[Inter] text-[12px] text-[#848484]">
                {active.role}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#4c4546] hover:text-[#8b5cf6] hover:bg-[#f5f3ff] rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">videocam</span>
            </button>
            <button className="p-2 text-[#4c4546] hover:text-[#8b5cf6] hover:bg-[#f5f3ff] rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </button>
            <button className="p-2 text-[#4c4546] hover:text-black hover:bg-[#eeeeee] rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div className="text-center">
            <span className="font-[Inter] text-[11px] font-semibold text-[#848484] uppercase tracking-widest bg-[#f3f3f3] px-3 py-1 rounded-full">
              AI Outreach Initiated
            </span>
          </div>

          {active.messages.map((msg: any, i: number) => (
            <div
              key={i}
              className={`flex gap-3 max-w-[80%] ${msg.sender === "ai" ? "" : "ml-auto flex-row-reverse"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${msg.sender === "ai" ? "bg-[#f5f3ff] text-[#8b5cf6]" : "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white"}`}
              >
                {msg.sender === "ai" ? (
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                ) : (
                  active.initials
                )}
              </div>
              <div className={`flex flex-col gap-1 ${msg.sender === "ai" ? "items-start" : "items-end"}`}>
                <div
                  className={`px-5 py-3 rounded-2xl font-[Inter] text-[14px] leading-relaxed shadow-sm ${msg.sender === "ai" ? "bg-white border border-[#cfc4c5]/30 text-[#1b1b1b] rounded-tl-sm" : "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-tr-sm"}`}
                >
                  {msg.text}
                </div>
                <span className="font-[Inter] text-[11px] text-[#848484] px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-5 bg-white border-t border-[#cfc4c5]/30 shrink-0">
          <div className="bg-[#f9f9f9] border border-[#cfc4c5]/60 rounded-2xl p-2 focus-within:border-[#8b5cf6] focus-within:ring-1 focus-within:ring-[#8b5cf6]/30 transition-all flex flex-col gap-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Take over the conversation..."
              className="w-full bg-transparent border-none resize-none focus:ring-0 font-[Inter] text-sm text-black placeholder:text-[#848484] outline-none leading-relaxed p-2"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="flex items-center justify-between px-2 pb-1">
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-[#848484] hover:text-[#4c4546] hover:bg-[#eeeeee] rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">attach_file</span>
                </button>
                <button className="p-1.5 text-[#848484] hover:text-[#4c4546] hover:bg-[#eeeeee] rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                </button>
                <button className="p-1.5 text-[#8b5cf6] hover:bg-[#f5f3ff] rounded-lg transition-colors cursor-pointer flex items-center gap-1 ml-2">
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  <span className="font-[Inter] text-[11px] font-semibold">AI Reply</span>
                </button>
              </div>
              <button
                className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${replyText.trim() ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-md hover:shadow-lg" : "bg-[#e2e2e2] text-[#848484] cursor-not-allowed"}`}
                disabled={!replyText.trim()}
                onClick={handleSendMessage}
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
