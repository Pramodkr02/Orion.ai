"use client";

import { motion } from "framer-motion";
import { Plus, FileText, Upload } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col gap-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Resume Builder
          </h2>
          <p className="text-gray-400 mt-2">Create and manage your professional resumes.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95">
          <Plus className="size-5" />
          Create New Resume
        </button>
      </motion.div>

      {/* Content Area - Example Dashboard Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* New Resume Card */}
        <div className="group relative aspect-[3/4] rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center p-6">
          <div className="size-16 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Plus className="size-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Create from Scratch</h3>
            <p className="text-sm text-gray-400 mt-1">Start with a blank canvas</p>
          </div>
        </div>

        {/* Upload Resume Card */}
        <div className="group relative aspect-[3/4] rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center p-6">
          <div className="size-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Upload className="size-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Import Resume</h3>
            <p className="text-sm text-gray-400 mt-1">Upload PDF or DOCX</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
