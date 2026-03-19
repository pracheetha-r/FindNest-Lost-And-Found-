import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Bell, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white overflow-hidden rounded-sm shadow-xl shadow-slate-200 border border-slate-200">
        
        {/* Left — Branding (Classic Dark Slate / Navy) */}
        <div className="flex-1 bg-slate-900 text-slate-100 p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {/* Subtle architectural lines instead of blurry circles */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 border border-slate-400 rounded-sm flex items-center justify-center">
                <MapPin className="w-5 h-5 text-slate-100" />
              </div>
              <span className="text-2xl tracking-widest uppercase font-light">FindNest</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light leading-snug mb-6">
              Reunite People <br />
              <span className="font-semibold text-white">with Their Belongings.</span>
            </h1>
            <p className="text-slate-400 text-lg mb-10 max-w-sm leading-relaxed font-light">
              The premier lost & found registry. Report, browse, and securely claim items with intelligent matching.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { icon: <Search className="w-4 h-4" />, label: "Intelligent Matching" },
                { icon: <Bell className="w-4 h-4" />, label: "Real-time Notifications" },
                { icon: <ShieldCheck className="w-4 h-4" />, label: "Secure Claim Verification" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-4 text-sm font-medium tracking-wide text-slate-300">
                  <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-300">
                    {f.icon}
                  </div>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 relative z-10 border-t border-slate-800 pt-8">
            {[
              { val: "2,400+", label: "Items Returned" },
              { val: "98%", label: "Match Accuracy" },
              { val: "12k+", label: "Active Members" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl font-medium text-white tracking-tight">{s.val}</p>
                <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Auth Card (Crisp White minimal) */}
        <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center bg-white">
          {/* Toggle */}
          <div className="flex gap-6 mb-10 border-b border-slate-200 pb-2">
            {["Login", "Sign Up"].map((tab) => (
              <button
                key={tab}
                onClick={() => setIsLogin(tab === "Login")}
                className={`pb-2 text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
                  (isLogin && tab === "Login") || (!isLogin && tab === "Sign Up")
                    ? "text-slate-900 border-b-2 border-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-light text-slate-900 mb-2">
            {isLogin ? "Welcome back." : "Create your account."}
          </h2>
          <p className="text-slate-500 text-sm mb-8 font-light">
            {isLogin ? "Enter your credentials to securely access your dashboard." : "Register to access the FindNest registry."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jordan Lee"
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent"
                />
              </div>
            )}
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <span className="text-slate-500 text-xs hover:text-slate-800 transition-colors cursor-pointer">Forgot password?</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium tracking-wide py-3.5 rounded-sm transition-all duration-300 mt-4 text-sm"
            >
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full flex items-center justify-center gap-3 border border-slate-300 rounded-sm py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
