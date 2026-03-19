import { useNavigate, useParams } from "react-router-dom";
import { dummyItems } from "../data/items";
import { MapPin, Target, Check, X, Search, Package, MapPin as MapPinLocation, Calendar, Tag, Info, Hand, Copy, Share, ChevronLeft } from "lucide-react";

function MatchRing({ score }: { score: number }) {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width="140" height="140" className="transform -rotate-90">
      <circle cx="70" cy="70" r={radius} stroke="#f1f5f9" strokeWidth="12" fill="none" />
      <circle
        cx="70" cy="70" r={radius}
        stroke="#0f172a" strokeWidth="12" fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

export default function MatchPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = dummyItems.find((i) => i.id === Number(id)) || dummyItems[0];
  const matchScore = item.matchScore || 85;

  const relatedItems = dummyItems.filter((i) => i.id !== item.id && i.category === item.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Nav */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate("/browse")} className="text-slate-400 hover:text-white transition p-1 hover:bg-slate-800 rounded-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-slate-600 rounded-sm flex items-center justify-center">
              <MapPin className="w-4 h-4 text-slate-100" />
            </div>
            <span className="text-white font-light uppercase tracking-widest text-lg">FindNest</span>
          </div>
          <span className="text-slate-500 ml-2 text-sm uppercase tracking-widest hidden sm:inline">/ Match Details</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Match Banner */}
        <div className="bg-white border border-slate-200 rounded-sm p-8 mb-10 shadow-sm flex flex-col sm:flex-row items-center gap-10">
          <div className="relative">
            <MatchRing score={matchScore} />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-light text-slate-900">{matchScore}%</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1">Match</span>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4 mb-3">
              <Target className="w-6 h-6 text-slate-900" />
              <h2 className="text-2xl font-light text-slate-900 tracking-tight">
                {matchScore >= 90 ? "High Probability Match" : matchScore >= 75 ? "Probable Match" : "Possible Correlation"}
              </h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl font-light mb-6">
              The FindNest intelligence engine has analyzed the provided parameters and detected a{" "}
              <span className="font-medium text-slate-900">{matchScore}% confidence rating</span> correlating the reported characteristics with this registry entry.
            </p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {[
                { label: "Category", match: true },
                { label: "Location", match: true },
                { label: "Date", match: matchScore >= 80 },
                { label: "Color", match: matchScore >= 85 },
                { label: "Description", match: matchScore >= 75 },
              ].map((tag) => (
                <div key={tag.label} className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold px-4 py-2 rounded-sm border ${
                  tag.match ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-200 line-through"
                }`}>
                  {tag.match ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} {tag.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Item Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-sm overflow-hidden shadow-sm border border-slate-200">
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full h-80 object-cover" />
                <div className={`absolute top-5 left-5 text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-sm border flex items-center gap-2 shadow-sm ${
                  item.type === "lost" ? "bg-slate-50 text-orange-700 border-orange-200" : "bg-slate-50 text-emerald-700 border-emerald-200"
                }`}>
                  {item.type === "lost" ? <Search className="w-3.5 h-3.5" /> : <Package className="w-3.5 h-3.5" />}
                  {item.type === "lost" ? "Reported Lost" : "Registered Found"}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">{item.category}</span>
                    <h1 className="text-3xl font-light text-slate-900 tracking-tight">{item.title}</h1>
                  </div>
                </div>
                <p className="text-slate-600 leading-loose text-sm font-light">{item.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
                  {[
                    { label: "Location", value: item.location, icon: <MapPinLocation className="w-4 h-4" /> },
                    { label: "Date", value: item.date, icon: <Calendar className="w-4 h-4" /> },
                    { label: "Category", value: item.category, icon: <Tag className="w-4 h-4" /> },
                    { label: "Status", value: item.type === "lost" ? "Awaiting Recovery" : "Secured", icon: <Info className="w-4 h-4" /> },
                  ].map((d) => (
                    <div key={d.label} className="bg-slate-50 rounded-sm p-4 border border-slate-100">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 flex items-center gap-2">
                        {d.icon} {d.label}
                      </p>
                      <p className="text-sm font-medium text-slate-900">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related */}
            {relatedItems.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-widest font-medium text-slate-900 mb-4 flex items-center gap-3">
                  <Search className="w-4 h-4" /> Auxiliary Matches
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedItems.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => navigate(`/match/${r.id}`)}
                      className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all text-left flex flex-col"
                    >
                      <img src={r.image} alt={r.title} className="w-full h-32 object-cover" />
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <p className="text-xs font-medium text-slate-900 line-clamp-2 mb-2">{r.title}</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{r.matchScore}% Match</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-sm p-8 shadow-lg border border-slate-800 text-center sm:text-left">
              <h3 className="font-light text-xl text-white mb-2 tracking-tight">Claim This Item</h3>
              <p className="text-slate-400 text-xs font-light mb-6">Confirm ownership and initiate the secure handover protocol.</p>
              
              <button
                onClick={() => navigate("/claim")}
                className="w-full bg-white hover:bg-slate-100 text-slate-900 font-medium text-sm py-4 rounded-sm transition-all duration-300 shadow-sm mb-4 flex items-center justify-center gap-3"
              >
                <Hand className="w-4 h-4" /> Start Claim
              </button>
              <button
                onClick={() => navigate("/browse")}
                className="w-full bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700 font-medium py-3 rounded-sm transition-all text-xs uppercase tracking-wide"
              >
                Back to Browse
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
              <h4 className="font-medium text-slate-900 mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4" /> Match Checklist
              </h4>
              <ul className="space-y-3 text-xs text-slate-600 font-light">
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Parameter alignment verified</li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Geolocation proximity confirmed</li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Temporal overlap positive</li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Visual heuristics acceptable</li>
                <li className="flex items-start gap-3"><Info className="w-4 h-4 text-amber-500 shrink-0" /> Description variances noted</li>
              </ul>
            </div>

            <div className="bg-white rounded-sm p-6 shadow-sm border border-slate-200">
              <h4 className="font-medium text-slate-900 mb-4 text-xs uppercase tracking-widest text-center">Share Page</h4>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-700 border border-slate-300 rounded-sm py-3 hover:bg-slate-50 transition">
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-700 border border-slate-300 rounded-sm py-3 hover:bg-slate-50 transition">
                  <Share className="w-3.5 h-3.5" /> Transmit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
