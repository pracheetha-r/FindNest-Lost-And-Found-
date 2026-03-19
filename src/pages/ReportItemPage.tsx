import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Package, UploadCloud, ChevronLeft, CheckCircle } from "lucide-react";

const categories = ["Bags", "Electronics", "Keys", "Accessories", "Documents", "Drinkware", "Clothing", "Other"];
const locations = ["Library", "Cafeteria", "Gym", "Parking Lot", "Classroom Block", "Student Union", "Sports Field", "Main Entrance", "Other"];

export default function ReportItemPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [reportType, setReportType] = useState<"lost" | "found">("lost");
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    description: "",
    contact: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleChange = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/browse"), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Nav */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="text-slate-400 hover:text-white transition flex items-center justify-center p-1 rounded-sm hover:bg-slate-800">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-slate-600 rounded-sm flex items-center justify-center">
              <MapPin className="w-4 h-4 text-slate-100" />
            </div>
            <span className="text-white font-light tracking-widest uppercase text-lg">FindNest</span>
          </div>
          <span className="text-slate-500 ml-2 text-sm uppercase tracking-widest">/ Report Item</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Report an Item</h1>
          <p className="text-slate-500 mt-2 font-light">Input the details below to add the item to the registry.</p>
        </div>

        {/* Lost / Found Toggle */}
        <div className="flex bg-white border border-slate-200 rounded-sm p-1.5 mb-10 shadow-sm w-fit">
          {(["lost", "found"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-sm text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                reportType === type
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {type === "lost" ? <Search className="w-4 h-4" /> : <Package className="w-4 h-4" />}
              {type === "lost" ? "Lost Item" : "Found Item"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="bg-white rounded-sm p-8 shadow-sm border border-slate-200">
            <h2 className="text-sm uppercase tracking-widest font-medium text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-6 h-6 bg-slate-100 border border-slate-200 text-slate-600 rounded-sm flex items-center justify-center text-xs">1</span>
              Upload Photograph
            </h2>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative border border-dashed rounded-sm transition-all cursor-pointer overflow-hidden ${
                preview ? "border-slate-400 bg-slate-50" : "border-slate-300 hover:border-slate-600 hover:bg-slate-50"
              }`}
              style={{ minHeight: 200 }}
            >
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs uppercase tracking-widest font-medium bg-slate-900/80 px-4 py-2 rounded-sm border border-slate-700">Change Photo</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-sm border border-slate-200 flex items-center justify-center mb-4">
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-700 font-medium text-sm">Click to upload a clear photograph</p>
                  <p className="text-slate-400 text-xs mt-2 uppercase tracking-wide">JPG/PNG up to 10MB</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </div>

          {/* Item Details */}
          <div className="bg-white rounded-sm p-8 shadow-sm border border-slate-200">
            <h2 className="text-sm uppercase tracking-widest font-medium text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-6 h-6 bg-slate-100 border border-slate-200 text-slate-600 rounded-sm flex items-center justify-center text-xs">2</span>
              Item Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 mb-2">Item Designation *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., Navy Blue Leather Wallet"
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 mb-2">Category *</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent appearance-none"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 mb-2">Date {reportType === "lost" ? "Lost" : "Found"} *</label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 mb-2">Location *</label>
                <select
                  required
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent appearance-none"
                >
                  <option value="">Select formal location</option>
                  {locations.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 mb-2">Detailed Description *</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Provide precise details: brand, distinct markings, dimensions..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-medium text-slate-700 mb-2">Contact Details</label>
                <input
                  value={form.contact}
                  onChange={(e) => handleChange("contact", e.target.value)}
                  placeholder="Official email or phone (optional)"
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitted}
            className={`w-full py-4 rounded-sm text-white font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
              submitted
                ? "bg-emerald-600 cursor-not-allowed"
                : "bg-slate-900 hover:bg-slate-800 shadow-xl"
            }`}
          >
            {submitted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Submitted! Initializing Match Protocol...
              </>
            ) : (
              "Submit Report to Registry"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
