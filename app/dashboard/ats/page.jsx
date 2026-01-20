"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  Layout,
  Type,
  FileCheck,
  Search,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ATSPage() {
  const [step, setStep] = useState("upload"); // upload | analyzing | result
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // --- Handlers ---
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (file) => {
    if (file && file.type === "application/pdf") {
      setFile(file);
      toast.success(`${file.name} uploaded successfully!`, {
        position: "bottom-right",
        theme: "dark",
      });
    } else {
      toast.error("Please upload a valid PDF file.", {
        theme: "dark",
      });
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    setStep("analyzing");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/ats/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Analysis failed");
      }

      setAnalysisResult(result.data);
      setStep("result");
    } catch (error) {
      console.error("Analysis Error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
      setStep("upload");
    }
  };

  const resetFlow = () => {
    setFile(null);
    setAnalysisResult(null);
    setStep("upload");
  };

  return (
    <div className="min-h-full flex flex-col relative overflow-hidden">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          ATS Score Checker
        </h1>
        <p className="text-gray-400">
          Optimize your resume for Applicant Tracking Systems and get hired
          faster.
        </p>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {step === "upload" && (
            <UploadView
              key="upload"
              isDragging={isDragging}
              file={file}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileSelect={handleFileSelect}
              onStartAnalysis={startAnalysis}
              onRemoveFile={() => setFile(null)}
            />
          )}
          {step === "analyzing" && <LoaderView key="analyzing" />}
          {step === "result" && analysisResult && (
            <ResultView
              key="result"
              file={file}
              result={analysisResult}
              onReset={resetFlow}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Components ---

function UploadView({
  isDragging,
  file,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onStartAnalysis,
  onRemoveFile,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div
        className={`
          border-2 border-dashed rounded p-12 text-center transition-all duration-300 ease-in-out
          flex flex-col items-center justify-center min-h-[400px]
          ${
            isDragging
              ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]"
              : "border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-900/80"
          }
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {!file ? (
          <>
            <div className="bg-gray-800 p-4 rounded-2xl mb-6 shadow-xl">
              <UploadCloud className="w-12 h-12 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Upload your resume
            </h3>
            <p className="text-gray-400 mb-8 max-w-md">
              Drag and drop your resume (PDF only) here, or click to browse.
              We'll analyze it against industry standards.
            </p>
            <label className="relative group cursor-pointer inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-indigo-500/25">
              <span>Choose PDF File</span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={onFileSelect}
              />
            </label>
          </>
        ) : (
          <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 relative">
            <button
              onClick={onRemoveFile}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors"
            >
              <AlertCircle className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center">
              <div className="bg-green-500/20 p-4 rounded-full mb-4">
                <FileText className="w-10 h-10 text-green-400" />
              </div>
              <p className="text-white font-medium text-lg mb-1 truncate max-w-[250px]">
                {file.name}
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Ready for ATS Analysis
              </p>
              <button
                onClick={onStartAnalysis}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Check ATS Score</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function LoaderView() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Determine approximate time based on expected AI latency (e.g. 5-8 seconds)
    // We'll increment progress slowly to keep user engaged.
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
            // Hang at 95 until real response comes
          return 95;
        }
        return prev + 1;
      });
    }, 100); 
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-[500px]"
    >
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-gray-700 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-4 border-r-4 border-indigo-500 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{progress}%</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">
        Analyzing your resume...
      </h3>
      <p className="text-gray-400 animate-pulse">
        Checking keywords, formatting, and readability
      </p>
    </motion.div>
  );
}

function ResultView({ file, result, onReset }) {
  const score = result.overall_score || 0;
  
  // Map result sections to UI format
  // Ensure we handle missing keys gracefully with defaults
  const sections = [
    { name: "Architecture", score: result.sections?.architecture || 0, icon: Layout },
    { name: "Content Quality", score: result.sections?.content || 0, icon: Type },
    { name: "Keywords Match", score: result.sections?.keywords || 0, icon: Search },
    { name: "Formatting", score: result.sections?.formatting || 0, icon: FileCheck },
    { name: "Readability", score: result.sections?.readability || 0, icon: FileText },
  ];

  // --- Score Circle Logic ---
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full"
    >
      {/* LEFT COLUMN: Report */}
      <div className="lg:col-span-7 space-y-6">
        {/* Overall Score Card */}
        <div className="bg-[#111111] border border-gray-800 rounded p-8 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative w-32 h-32 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-800"
              />
              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                cx="64"
                cy="64"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeLinecap="round"
                className={`${
                  score >= 80
                    ? "text-green-500"
                    : score >= 60
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {score}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Score
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left z-10">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <CheckCircle className={`w-5 h-5 ${score >= 70 ? "text-green-500" : "text-yellow-500"}`} />
              <span className={`${score >= 70 ? "text-green-500" : "text-yellow-500"} font-medium`}>
                {score >= 85 ? "Excellent Match" : score >= 70 ? "Good Match" : "Needs Improvement"}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
                {score >= 80 ? "Great Job! Your resume is ATS friendly." : "Feedback Available"}
            </h2>
            <p className="text-gray-400 text-sm">
              {result.summary || "Your resume has been analyzed."}
            </p>
          </div>
        </div>

        {/* Breakdown Section */}
        <div className="bg-[#111111] border border-gray-800 rounded p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Detailed Breakdown
          </h3>
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={section.name}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <section.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-200">
                      {section.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {section.score}/100
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${section.score}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-full rounded-full ${
                      section.score >= 80
                        ? "bg-green-500"
                        : section.score >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Preview & Action */}
      <div className="lg:col-span-5 space-y-6">
        {/* PDF Preview Mock */}
        <div className="bg-gray-100 rounded p-4 h-[610px] relative overflow-hidden group shadow-2xl">
          {/* Simple CSS-based resume mockup */}
          <div className="w-full h-full bg-white shadow-inner rounded-xl p-8 overflow-hidden opacity-90 transform group-hover:scale-[1.02] transition-transform duration-500">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <br />
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-11/12"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </div>

          <div className="absolute top-6 right-6">
            <span className="bg-black/70 backdrop-blur text-white text-xs px-3 py-1 rounded-full">
              {file ? file.name : "Resume.pdf"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onReset}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Scan Another Resume</span>
        </button>
      </div>
    </motion.div>
  );
}
