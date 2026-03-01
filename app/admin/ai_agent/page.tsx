"use client";

import {
  BarChart2,
  Clock,
  Construction,
  PaperclipIcon,
  Shield,
  Users,
  VoicemailIcon,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-0.5 h-[1.1em] bg-neutral-500 ml-0.5 align-middle animate-pulse" />
      )}
    </span>
  );
}

export default function Home() {
  const [input, setInput] = useState("");
  type Message = { role: "user" | "ai"; text: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;
    const message = input.trim();
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.output_text || data.error || "Xato yuz berdi.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Server bilan bog'lanishda xato." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#89aac3]/15 border border-[#89aac3]/30 rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#4a7a9b]" />
            </div>
            <div>
              <span className="font-semibold text-gray-800 text-sm">
                Admin Panel
              </span>
              <p className="text-gray-400 text-xs">Best Globalize</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <Users className="w-3.5 h-3.5" />
              Foydalanuvchilar
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Statistika
            </Link>
            <Link
              href="/admin/logs"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <Clock className="w-3.5 h-3.5" />
              Logs
            </Link>
            <Link
              href="/admin/country"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <Construction className="w-3.5 h-3.5" />
              Davlat
            </Link>
            <Link
              href="/admin/blogs"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <PaperclipIcon className="w-3.5 h-3.5" />
              Blogs
            </Link>
            <Link
              href="/admin/faq"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4a7a9b] px-3 py-1.5 rounded-lg hover:bg-[#89aac3]/10 border border-transparent hover:border-[#89aac3]/20 transition"
            >
              <VoicemailIcon className="w-3.5 h-3.5" />
              FAQs
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">bestie</span>
            </div>
          </div>
        </div>
      </header>
      <div
        className="flex flex-col h-screen bg-white text-neutral-900"
        style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        textarea { font-family: inherit; }
      `}</style>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-xl w-full mx-auto px-6 py-12 space-y-10">
            {messages.length === 0 && (
              <p className="text-neutral-300 text-xl italic mt-28 text-center select-none">
                What Can I help with?
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1.5 ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <span className="text-[11px] tracking-widest uppercase text-neutral-300">
                  {msg.role === "user" ? "Siz" : "AI"}
                </span>

                <p
                  className={`text-[1.15rem] leading-[1.8] whitespace-pre-wrap max-w-[88%] ${
                    msg.role === "user"
                      ? "text-neutral-600"
                      : "text-neutral-900"
                  }`}
                >
                  {msg.role === "ai" && i === messages.length - 1 ? (
                    <TypewriterText text={msg.text} />
                  ) : (
                    msg.text
                  )}
                </p>
              </div>
            ))}

            {loading && (
              <div className="flex flex-col gap-1.5 items-start">
                <span className="text-[11px] tracking-widest uppercase text-neutral-500">
                  AI
                </span>
                <div className="flex gap-[5px] items-center py-1">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className="bg-white border-t border-neutral-100">
          <div className="max-w-xl w-full mx-auto px-6 py-4">
            <div className="flex items-end gap-3 border border-neutral-200 rounded-2xl px-4 py-3 bg-neutral-50 focus-within:bg-white focus-within:border-neutral-400 transition-all duration-200">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                placeholder="Ask anything"
                className="flex-1 bg-transparent outline-none resize-none text-[1.05rem] leading-relaxed text-neutral-800 placeholder-neutral-300"
                style={{ maxHeight: "140px", overflowY: "auto" }}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
                className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center disabled:opacity-20 hover:bg-neutral-700 active:scale-95 transition-all duration-150"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 10V2M6 2L2.5 5.5M6 2L9.5 5.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="text-center text-[11px] text-neutral-300 mt-2 select-none tracking-wide">
              Enter — yuborish · Shift+Enter — yangi qator
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
