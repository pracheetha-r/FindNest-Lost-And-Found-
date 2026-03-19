import { useNavigate } from "react-router-dom";
import { 
  ClipboardList, CheckCircle, Clock, TrendingUp, 
  MapPin, Package, Search, Sparkles, 
  Tag, MessageSquare, Settings, ChevronRight
} from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();

  const stats = [
    { label: "Items Reported", value: "1,284", icon: <ClipboardList className="w-5 h-5" />, change: "+12 this week" },
    { label: "Items Returned", value: "947", icon: <CheckCircle className="w-5 h-5" />, change: "+8 this week" },
    { label: "Pending Claims", value: "63", icon: <Clock className="w-5 h-5" />, change: "3 need review" },
    { label: "Match Rate", value: "87%", icon: <TrendingUp className="w-5 h-5" />, change: "↑ 2% this month" },
  ];

  const recentActivity = [
    { id: 1, action: "New item found", item: "AirPods Pro", location: "Gym", time: "2 min ago", type: "found" },
    { id: 2, action: "Claim approved", item: "Navy Backpack", location: "Library", time: "15 min ago", type: "claimed" },
    { id: 3, action: "Item reported lost", item: "Silver Keys", location: "Parking B", time: "1 hr ago", type: "lost" },
    { id: 4, action: "Match found", item: "Brown Wallet", location: "Student Union", time: "2 hr ago", type: "match" },
    { id: 5, action: "New item found", item: "Purple Bottle", location: "Sports Field", time: "3 hr ago", type: "found" },
  ];

  const typeConfig: Record<string, { bg: string, text: string, icon: React.ReactNode }> = {
    found: { bg: "bg-slate-100", text: "text-slate-700", icon: <Package className="w-4 h-4" /> },
    claimed: { bg: "bg-emerald-50", text: "text-emerald-700", icon: <CheckCircle className="w-4 h-4" /> },
    lost: { bg: "bg-orange-50", text: "text-orange-700", icon: <Search className="w-4 h-4" /> },
    match: { bg: "bg-blue-50", text: "text-blue-700", icon: <Sparkles className="w-4 h-4" /> },
  };

  const quickLinks = [
    { label: "My Reports", icon: <ClipboardList className="w-5 h-5" />, path: "/browse" },
    { label: "My Claims", icon: <Tag className="w-5 h-5" />, path: "/claim" },
    { label: "AI Matches", icon: <Sparkles className="w-5 h-5" />, path: "/match/1" },
    { label: "Messages", icon: <MessageSquare className="w-5 h-5" />, path: "/chat" },
    { label: "Settings", icon: <Settings className="w-5 h-5" />, path: "/dashboard" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Nav (Classic Chic Dark) */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-slate-600 rounded-sm flex items-center justify-center">
              <MapPin className="w-5 h-5 text-slate-100" />
            </div>
            <span className="text-white text-xl font-light tracking-widest uppercase">FindNest</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm hidden sm:block tracking-wide">
              Welcome back, <span className="text-white font-medium">Jordan</span>
            </span>
            <div className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer hover:bg-slate-700 transition">
              JL
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">Here's what's happening today</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-sm p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="text-slate-400 bg-slate-50 p-2 rounded-sm border border-slate-100">
                  {s.icon}
                </div>
                <span className="text-xs text-slate-500 font-medium tracking-wide bg-slate-50 px-2.5 py-1 rounded-sm border border-slate-100">{s.change}</span>
              </div>
              <p className="text-3xl font-light text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <button
            onClick={() => navigate("/report")}
            className="group relative bg-slate-900 rounded-sm p-8 text-left border border-slate-800 shadow-lg hover:bg-slate-800 transition-all duration-300 overflow-hidden"
          >
            {/* Minimal pattern instead of blobs */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-700/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 border border-slate-600 rounded-sm flex items-center justify-center mb-6 text-slate-300 group-hover:bg-slate-800 transition">
                  <Package className="w-6 h-6 text-slate-100" />
                </div>
                <h3 className="text-2xl font-light text-white mb-3 tracking-tight">Report an Item</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
                  Lost something or found an item? Register it in the database and let our intelligent engine find a match.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-slate-100 font-medium text-sm tracking-wide">
                Get Started <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/browse")}
            className="group relative bg-white rounded-sm p-8 text-left border border-slate-200 shadow-md hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center mb-6 text-slate-600 group-hover:bg-slate-100 transition">
                  <Search className="w-6 h-6 text-slate-800" />
                </div>
                <h3 className="text-2xl font-light text-slate-900 mb-3 tracking-tight">Browse Items</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-light">
                  Search through the comprehensive registry of all reported lost and found items worldwide.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-slate-900 font-medium text-sm tracking-wide">
                Browse Now <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* Quick Links + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Links */}
          <div className="bg-white rounded-sm p-8 border border-slate-200 shadow-sm">
            <h3 className="text-sm uppercase tracking-widest font-medium text-slate-900 mb-6">Quick Actions</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-sm hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left group"
                >
                  <span className="text-slate-400 group-hover:text-slate-900 transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-slate-900 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-sm p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm uppercase tracking-widest font-medium text-slate-900">Recent Activity</h3>
              <button className="text-xs font-medium text-slate-500 hover:text-slate-900 tracking-wide uppercase">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((a) => {
                const conf = typeConfig[a.type];
                return (
                  <div key={a.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-sm hover:bg-slate-50 hover:border-slate-200 transition-all">
                    <div className={`w-10 h-10 ${conf.bg} border border-white rounded-sm flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <span className={conf.text}>{conf.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{a.item}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{a.action} · <span className="text-slate-400">{a.location}</span></p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-semibold ${conf.bg} ${conf.text} border border-[rgba(0,0,0,0.05)]`}>
                        {a.type}
                      </span>
                      <span className="text-xs text-slate-400">{a.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
