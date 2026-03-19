import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyItems, categories } from "../data/items";
import { MapPin, Search as SearchIcon, Package, Plus, ChevronLeft, MapPin as MapPinLocation } from "lucide-react";

export default function BrowsePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState<"all" | "lost" | "found">("all");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = dummyItems.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchType = selectedType === "all" || item.type === selectedType;
    return matchSearch && matchCat && matchType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === "match") return (b.matchScore || 0) - (a.matchScore || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Nav */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
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
          <span className="text-slate-500 ml-2 text-sm uppercase tracking-widest hidden sm:inline">/ Browse Items</span>
          <button
            onClick={() => navigate("/report")}
            className="ml-auto flex items-center gap-2 bg-white text-slate-900 font-medium text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-slate-100 transition shadow-sm border border-slate-300"
          >
            <Plus className="w-3.5 h-3.5" /> Report
          </button>
        </div>
      </nav>

      {/* Search Hero */}
      <div className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-light text-slate-900 mb-3 tracking-tight">Browse Lost & Found Items</h1>
          <p className="text-slate-500 mb-8 font-light text-sm">Search through all reported items currently logged in the FindNest system.</p>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by designation, details, or location..."
              className="w-full pl-12 pr-4 py-4 rounded-sm text-sm text-slate-900 border border-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-center justify-between border-b border-slate-200 pb-6">
          <div className="flex flex-wrap gap-6 items-center">
            {/* Type filter */}
            <div className="flex bg-slate-100 rounded-sm border border-slate-200 p-1 shadow-inner h-fit">
              {(["all", "lost", "found"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-widest transition-all ${
                    selectedType === t 
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                      : "text-slate-500 hover:text-slate-700 border border-transparent"
                  }`}
                >
                  {t === "lost" && <SearchIcon className="w-3.5 h-3.5" />}
                  {t === "found" && <Package className="w-3.5 h-3.5" />}
                  {t === "all" ? "All" : t}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider border transition-all ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="ml-auto w-full sm:w-auto mt-4 sm:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto text-xs uppercase tracking-widest border border-slate-300 rounded-sm px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white shadow-sm appearance-none font-medium text-slate-700"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="match">Sort: Match Score</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest font-medium">
          Showing <span className="text-slate-900 font-bold">{sorted.length}</span> items
        </p>

        {/* Grid */}
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border-t border-slate-200">
            <SearchIcon className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-xl font-light text-slate-700">No items found</h3>
            <p className="text-slate-400 mt-2 text-sm">Please refine your search parameters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/match/${item.id}`)}
                className="group bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col text-left"
              >
                <div className="relative overflow-hidden shrink-0 border-b border-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 left-4 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm border shadow-sm flex items-center gap-1.5 ${
                    item.type === "lost" 
                      ? "bg-slate-50 text-orange-700 border-orange-200" 
                      : "bg-slate-50 text-emerald-700 border-emerald-200"
                  }`}>
                    {item.type === "lost" ? <SearchIcon className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                    {item.type}
                  </div>
                  {item.matchScore && item.matchScore >= 80 && (
                    <div className="absolute top-4 right-4 bg-slate-900 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm shadow-sm">
                      {item.matchScore}% Match
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">{item.category}</span>
                  <h3 className="text-base font-medium text-slate-900 mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">{item.description}</p>
                  
                  <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPinLocation className="w-3.5 h-3.5" />
                      <span className="text-xs line-clamp-1">{item.location}</span>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{item.date}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
