import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Check, FileText, UploadCloud, File, ShieldCheck, CheckCircle } from "lucide-react";

const questions = [
  "State the primary color and material of the item:",
  "Detail any unique demarcations, serial numbers, or identifiers:",
  "Enumerate the contents of the item when last in your possession:",
  "Specify the exact coordinates or location of last known use:",
];

export default function ClaimPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [docFile, setDocFile] = useState<string | null>(null);
  const [docName, setDocName] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<"form" | "review" | "done">("form");

  const handleAnswer = (i: number, val: string) => {
    setAnswers((a) => { const n = [...a]; n[i] = val; return n; });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocFile(URL.createObjectURL(file));
      setDocName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
    setTimeout(() => navigate("/chat"), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Nav */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition p-1 hover:bg-slate-800 rounded-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-slate-600 rounded-sm flex items-center justify-center">
              <MapPin className="w-4 h-4 text-slate-100" />
            </div>
            <span className="text-white font-light uppercase tracking-widest text-lg">FindNest</span>
          </div>
          <span className="text-slate-500 ml-2 text-sm uppercase tracking-widest">/ Claim Item</span>
        </div>
      </nav>

      {step === "done" ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="bg-white rounded-sm p-16 border border-slate-200 shadow-xl text-center max-w-lg w-full">
            <div className="w-24 h-24 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-8 bg-slate-50">
              <CheckCircle className="w-10 h-10 text-slate-900" />
            </div>
            <h2 className="text-3xl font-light text-slate-900 mb-4 tracking-tight">Claim Submitted</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light">
              Your verification answers have been saved. Our team will review the details.
            </p>
            <div className="border border-slate-300 rounded-sm p-4 text-xs text-slate-700 tracking-widest uppercase font-medium bg-slate-50">
              Taking you to the chat...
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-16">
            {["Identity", "Documentation", "Authorization"].map((s, i) => {
              const current = step === "form" ? 0 : step === "review" ? 1 : 2;
              return (
                <div key={s} className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-[10px] uppercase font-bold tracking-widest transition-all ${
                    i <= current ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-400"
                  }`}>
                    {i < current ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-bold hidden sm:block ${i <= current ? "text-slate-900" : "text-slate-400"}`}>{s}</span>
                  {i < 2 && <div className={`flex-1 h-px ${i < current ? "bg-slate-900" : "bg-slate-200"}`} />}
                </div>
              );
            })}
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-light text-slate-900 tracking-tight">Claim Verification</h1>
            <p className="text-slate-500 mt-2 font-light text-sm">Please provide details to verify you are the owner of this item.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Verification Questions */}
            <div className="bg-white rounded-sm p-8 shadow-sm border border-slate-200">
              <h2 className="uppercase tracking-widest font-medium text-slate-900 mb-8 flex items-center gap-3 text-xs">
                <FileText className="w-4 h-4 text-slate-400" /> Questions
              </h2>
              <div className="space-y-8">
                {questions.map((q, i) => (
                  <div key={i}>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-3">
                      {i + 1}. {q}
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={answers[i]}
                      onChange={(e) => handleAnswer(i, e.target.value)}
                      placeholder="Input data here..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Document Upload */}
            <div className="bg-white rounded-sm p-8 shadow-sm border border-slate-200">
              <h2 className="uppercase tracking-widest font-medium text-slate-900 mb-2 flex items-center gap-3 text-xs">
                <File className="w-4 h-4 text-slate-400" /> Supporting Documentation
              </h2>
              <p className="text-slate-400 text-xs mb-6 font-light">Attach official identification or receipts associated with the asset.</p>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed rounded-sm p-10 text-center cursor-pointer transition-all ${
                  docFile ? "border-slate-400 bg-slate-50" : "border-slate-300 hover:border-slate-600 hover:bg-slate-50"
                }`}
              >
                {docFile ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border border-slate-300 bg-white rounded-sm flex items-center justify-center shadow-sm">
                      <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">{docName}</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Click to supersede file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border border-slate-200 bg-slate-50 rounded-sm flex items-center justify-center">
                      <UploadCloud className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Select Document</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">PDF, JPG, PNG — MAX 10MB</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" onChange={handleFile} className="hidden" accept=".pdf,image/*" />
            </div>

            {/* Identity */}
            <div className="bg-white rounded-sm p-8 shadow-sm border border-slate-200">
              <h2 className="uppercase tracking-widest font-medium text-slate-900 mb-6 flex items-center gap-3 text-xs">
                <ShieldCheck className="w-4 h-4 text-slate-400" /> Personal Identity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">Legal Name *</label>
                  <input required placeholder="First Last" className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">Staff/Student Identifier *</label>
                  <input required placeholder="ID Number" className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">Direct Contact *</label>
                  <input required type="tel" placeholder="+1 (000) 000-0000" className="w-full px-4 py-3 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-transparent" />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="bg-slate-50 border border-slate-200 rounded-sm p-6">
              <label className="flex items-start gap-4 cursor-pointer">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all ${
                      agreed ? "bg-slate-900 border-slate-900" : "border-slate-400 bg-white"
                    }`}
                  >
                    {agreed && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                <span className="text-xs text-slate-600 leading-relaxed font-light">
                  I formally declare that I am the legitimate owner of this asset and attest that the above data is strictly factual. I acknowledge that fraudulent representations will incur administrative sanctions.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreed}
              className={`w-full py-4 rounded-sm font-medium text-sm transition-all duration-300 tracking-wide ${
                agreed
                  ? "bg-slate-900 hover:bg-slate-800 text-white shadow-xl"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
              }`}
            >
              Submit Claim
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
