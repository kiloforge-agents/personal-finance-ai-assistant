"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  User,
  Bot,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Mic,
  Paperclip,
  TrendingUp,
} from "lucide-react";
import { generateAIResponse, aiSuggestions } from "@/lib/data";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

function parseMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p class="mb-2">')
    .replace(/\n/g, '<br/>')
    .replace(/^/, '<p class="mb-2">')
    .replace(/$/, '</p>');
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="glass rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          <div className="typing-dot w-1.5 h-1.5 bg-indigo-400 rounded-full" />
          <div className="typing-dot w-1.5 h-1.5 bg-indigo-400 rounded-full" />
          <div className="typing-dot w-1.5 h-1.5 bg-indigo-400 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: "👋 **Hello, Jordan!** I'm your AI Finance Assistant, powered by real-time analysis of your spending data.\n\nI can help you:\n\n• 📊 Analyze spending patterns across any category\n• 💰 Track and optimize your monthly budgets\n• 📈 Compare spending trends over time\n• 💡 Discover personalized money-saving opportunities\n• 🏪 Evaluate in-store purchase decisions instantly\n\nWhat would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const aiContent = generateAIResponse(content);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiContent,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([{
      id: "reset",
      role: "assistant",
      content: "Chat cleared! How can I help you with your finances today?",
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center glow-indigo">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">AI Finance Assistant</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">Connected to your data</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs text-indigo-300 font-medium">Analyzing Apr 2025</span>
          </div>
          <button
            onClick={clearChat}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all"
            title="Clear chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end gap-3 chat-message",
              msg.role === "user" && "flex-row-reverse"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              msg.role === "assistant"
                ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                : "bg-gradient-to-br from-slate-600 to-slate-700"
            )}>
              {msg.role === "assistant"
                ? <Bot className="w-4 h-4 text-white" />
                : <User className="w-4 h-4 text-white" />
              }
            </div>

            <div className={cn(
              "group max-w-[78%]",
              msg.role === "user" ? "items-end" : "items-start"
            )}>
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "assistant"
                    ? "glass rounded-bl-sm ai-message"
                    : "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-sm"
                )}
              >
                {msg.role === "assistant" ? (
                  <div
                    className="text-[var(--text-secondary)]"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                  />
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>

              <div className={cn(
                "flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                {msg.role === "assistant" && (
                  <>
                    <button
                      onClick={() => copyMessage(msg.id, msg.content)}
                      className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded text-[var(--text-muted)] hover:text-emerald-400 transition-colors">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded text-[var(--text-muted)] hover:text-red-400 transition-colors">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                    {copiedId === msg.id && (
                      <span className="text-[10px] text-emerald-400">Copied!</span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 2 && (
        <div className="px-6 pb-3">
          <p className="text-xs text-[var(--text-muted)] mb-2">Try asking:</p>
          <div className="flex gap-2 flex-wrap">
            {aiSuggestions.map((s) => (
              <button key={s} className="chip" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-6 pb-6">
        <div className="flex items-end gap-2 glass rounded-2xl px-4 py-3">
          <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your spending, budgets, or savings..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none outline-none leading-relaxed"
            style={{ minHeight: "24px", maxHeight: "120px" }}
          />
          <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 transition-colors">
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
              input.trim() && !isTyping
                ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:opacity-90"
                : "bg-[var(--border)] text-[var(--text-muted)]"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-[10px] text-[var(--text-muted)] mt-2">
          AI responses are based on your connected financial data. Not financial advice.
        </p>
      </div>
    </div>
  );
}
