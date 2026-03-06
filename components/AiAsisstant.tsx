"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot } from "lucide-react";

type Message = { role: "user" | "ai"; text: string };

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
    }, 14);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[0.9em] bg-neutral-400 ml-[2px] align-middle animate-pulse" />
      )}
    </span>
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Salom! Blog yozishda yordam kerakmi? Sarlavha, tavsif yoki kategoriya bo'yicha savol bering 🙂",
    },
  ]);
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
    if (textareaRef.current) textareaRef.current.style.height = "auto";

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
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-neutral-900 hover:bg-neutral-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95"
        title="AI Yordamchi"
      >
        {open ? <X size={18} /> : <Sparkles size={18} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-22 right-6 z-50 w-80 bg-white border border-neutral-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            height: "450px",
            animation: "slideUp 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-neutral-100 bg-neutral-50">
            <div className="w-7 h-7 bg-neutral-900 rounded-full flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800">
                AI Yordamchi
              </p>
              <p className="text-[10px] text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-neutral-900 text-white rounded-br-sm"
                      : "bg-neutral-100 text-neutral-800 rounded-bl-sm"
                  }`}
                >
                  {msg.role === "ai" && i === messages.length - 1 ? (
                    <TypewriterText text={msg.text} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 px-3 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-neutral-100 px-3 py-2.5">
            <div className="flex items-end gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 focus-within:border-neutral-400 focus-within:bg-white transition-all">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                placeholder="Savol bering..."
                className="flex-1 bg-transparent outline-none resize-none text-sm leading-relaxed text-neutral-800 placeholder-neutral-400"
                style={{ maxHeight: "80px", overflowY: "auto" }}
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
                className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center disabled:opacity-20 hover:bg-neutral-700 transition-all active:scale-95"
              >
                <Send size={11} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
