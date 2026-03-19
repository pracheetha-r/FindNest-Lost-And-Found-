import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chatMessages } from "../data/items";
import { ChevronLeft, MapPin, Send, CheckCircle2, ShieldAlert, Circle, Clock, Check } from "lucide-react";

type Message = {
  id: number;
  sender: "me" | "other" | "system";
  text: string;
  time: string;
  name?: string;
};

type HandoverStatus = "pending" | "in_progress" | "completed";

const statusConfig: Record<HandoverStatus, { label: string; icon: React.ReactNode; currentBg: string }> = {
  pending: { label: "Under Review", icon: <Clock className="w-4 h-4" />, currentBg: "border-amber-200 bg-amber-50" },
  in_progress: { label: "Active Protocol", icon: <Circle className="w-4 h-4 fill-slate-900" />, currentBg: "border-slate-300 bg-slate-50" },
  completed: { label: "Fully Resolved", icon: <CheckCircle2 className="w-4 h-4" />, currentBg: "border-emerald-200 bg-emerald-50" },
};

export default function ChatPage() {
  const navigate = useNavigate();
  // Strip emojis from dummy data
  const initialMessages = chatMessages.map(m => ({
    ...m, text: m.text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '')
  }));
  const [messages, setMessages] = useState<Message[]>(initialMessages as Message[]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<HandoverStatus>("in_progress");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((m) => [...m, newMsg]);
    setInput("");
    
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          sender: "other",
          name: "Campus Security",
          text: "Acknowledged. Updating the logs. See you at the dispatch.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const statusCfg = statusConfig[status];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Nav */}
      <nav className="bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="text-slate-400 hover:text-white transition p-1 hover:bg-slate-800 rounded-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-slate-600 rounded-sm flex items-center justify-center">
              <MapPin className="w-4 h-4 text-slate-100" />
            </div>
            <span className="text-white font-light uppercase tracking-widest text-lg">FindNest</span>
          </div>
          <span className="text-slate-500 ml-2 text-sm uppercase tracking-widest hidden sm:inline">/ Chat</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8 flex-1">
        {/* Left — Chat */}
        <div className="flex-1 bg-white rounded-sm shadow-sm border border-slate-200 flex flex-col overflow-hidden" style={{ minHeight: 600 }}>
          {/* Chat Header */}
          <div className="flex items-center gap-5 px-8 py-5 border-b border-slate-200 shrink-0 bg-slate-50">
            <div className="relative">
              <div className="w-12 h-12 border border-slate-300 bg-white rounded-sm flex items-center justify-center text-slate-900 font-bold text-sm tracking-widest">CS</div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-[3px] border-slate-50" />
            </div>
            <div>
              <p className="font-medium text-slate-900 tracking-tight">Campus Security Division</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mt-1">Direct Link Active</p>
            </div>
            <div className={`ml-auto flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-sm border ${statusCfg.currentBg} text-slate-700`}>
              {statusCfg.icon}
              {statusCfg.label}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            {messages.map((msg) => {
              if (msg.sender === "system") {
                return (
                  <div key={msg.id} className="flex justify-center my-6">
                    <div className="bg-slate-100 border border-slate-200 text-slate-500 text-[10px] uppercase tracking-widest font-bold px-6 py-2 rounded-sm max-w-sm text-center">
                      {msg.text}
                    </div>
                  </div>
                );
              }
              if (msg.sender === "me") {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-md">
                      <div className="bg-slate-900 border border-slate-800 text-slate-100 px-5 py-4 rounded-sm rounded-tr-none text-sm leading-relaxed shadow-sm">
                        {msg.text}
                      </div>
                      <p className="text-right text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-2">{msg.time}</p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={msg.id} className="flex items-end gap-4">
                  <div className="w-8 h-8 border border-slate-300 bg-slate-50 rounded-sm flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0">
                    CS
                  </div>
                  <div className="max-w-md">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">{msg.name}</p>
                    <div className="bg-white border border-slate-200 text-slate-800 px-5 py-4 rounded-sm rounded-tl-none text-sm leading-relaxed shadow-sm">
                      {msg.text}
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-2">{msg.time}</p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-8 py-5 border-t border-slate-200 shrink-0 bg-slate-50">
            <div className="flex items-end gap-4">
              <div className="flex-1 bg-white border border-slate-300 rounded-sm px-5 py-4 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 transition-all shadow-sm">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Transmit message..."
                  className="w-full bg-transparent text-sm text-slate-900 resize-none focus:outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`w-14 h-14 rounded-sm flex items-center justify-center shrink-0 transition-all ${
                  input.trim()
                    ? "bg-slate-900 hover:bg-slate-800 text-white shadow-md border border-slate-800"
                    : "bg-slate-100 border border-slate-200 text-slate-300 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-4 text-center">Transmit via Enter  /  Shift+Enter for break</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-80 space-y-6 shrink-0">
          {/* Handover Status */}
          <div className="bg-white rounded-sm p-8 shadow-sm border border-slate-200">
            <h3 className="uppercase tracking-widest font-medium text-slate-900 mb-6 text-xs border-b border-slate-100 pb-4">Handover Status</h3>
            <div className="space-y-4">
              {(["pending", "in_progress", "completed"] as HandoverStatus[]).map((s, i) => {
                const cfg = statusConfig[s];
                const isActive = s === status;
                const isPast = ["pending", "in_progress", "completed"].indexOf(s) < ["pending", "in_progress", "completed"].indexOf(status);
                return (
                  <div key={s} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold shrink-0 transition-all ${
                      isActive ? `bg-slate-900 text-white shadow-sm border border-slate-900` : isPast ? "bg-white border border-slate-300 text-slate-500" : "bg-slate-50 border border-slate-200 text-slate-300"
                    }`}>
                      {isPast ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <div>
                      <p className={`text-xs uppercase tracking-widest font-bold ${isActive ? "text-slate-900" : isPast ? "text-slate-500" : "text-slate-300"}`}>
                        {cfg.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 space-y-3 pt-6 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Override Status</p>
              {(["pending", "in_progress", "completed"] as HandoverStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`w-full text-xs uppercase tracking-widest font-bold py-3 rounded-sm border transition-all ${
                    status === s
                      ? `bg-slate-900 text-white border-slate-900`
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
                  }`}
                >
                  {statusConfig[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Item Summary */}
          <div className="bg-white rounded-sm p-8 shadow-sm border border-slate-200">
            <h3 className="uppercase tracking-widest font-medium text-slate-900 mb-5 text-xs">Claimed Item</h3>
            <div className="border border-slate-200 rounded-sm p-1.5 mb-4">
              <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" alt="Item" className="w-full h-32 object-cover rounded-sm" />
            </div>
            <p className="text-sm font-medium text-slate-900 line-clamp-1 mb-1">Navy Blue Bag</p>
            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs">Central Hub · Jun 10</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-100 rounded-none h-1">
                <div className="bg-slate-900 h-1" style={{ width: "92%" }} />
              </div>
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">92%</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-2">Similarity Index</p>
          </div>

          {/* Pickup Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-sm p-8">
            <h3 className="uppercase tracking-widest font-medium text-slate-900 mb-5 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-500" /> Pickup Location
            </h3>
            <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-2">
              <p className="font-medium text-slate-900 text-sm">Main Operations</p>
              <p className="text-slate-500 text-xs font-light">Sector A, Ground Level</p>
              <p className="text-slate-500 text-xs font-light">08:00 – 18:00 HRS</p>
              <div className="pt-3 mt-3 border-t border-slate-100">
                <p className="text-slate-900 font-medium text-xs tracking-wide">T-Zero: 15:00 HRS</p>
              </div>
            </div>
            <button
              onClick={() => setStatus("completed")}
              className="mt-6 w-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-sm transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Mark as Collected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
