"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FileText, 
  PenTool, 
  Mail, 
  Linkedin, 
  Zap, 
  BarChart, 
  Search, 
  Target, 
  LogOut,
  ChevronRight,
  Plus
} from "lucide-react";
import { MdDashboard } from "react-icons/md"; // Example usage of react-icons if needed, but Lucide is cleaner.
// Sticking to Lucide for consistency as they look very similar to the mock, but will mix if strictly needed. 
// actually the mock defines specific shapes. I'll use Lucide primarily for the clean SaaS look but keep react-icons available.

const menuItems = [
  { name: "Resume Builder", icon: FileText, href: "/dashboard", active: true },
  { name: "Resume Rewriter", icon: PenTool, href: "/dashboard/rewriter", disabled: true },
  { name: "Cover Letter Generator", icon: Mail, href: "/dashboard/cover-letter", disabled: true },
  { name: "LinkedIn Optimizer", icon: Linkedin, href: "/dashboard/linkedin", disabled: true },
  { name: "Resume Analyzer", icon: Zap, href: "/dashboard/analyzer", disabled: true },
  { name: "ATS Score Check", icon: BarChart, href: "/dashboard/ats", disabled: true },
  { name: "Resume Review", icon: Search, href: "/dashboard/review", disabled: true },
  { name: "Job Match Analysis", icon: Target, href: "/dashboard/job-match", disabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0a0a0a] text-white border-r border-white/5 flex flex-col p-6 z-40">
      {/* Logo Area */}
      <div className="mb-10 flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Resume <span className="text-white/60">Studio</span>
        </h1>
      </div>

      {/* Tools Section */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="text-xs font-semibold text-white/40 mb-4 tracking-wider uppercase">
          Tools
        </div>
        
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // For the active "Resume Builder" which looks special in design (purple bg)
            // Or just generally active state based on path.
            // unique check for strictly highlighting "Resume Builder" as per prompt flow request
            const isActive = item.href === "/dashboard" && pathname === "/dashboard"; 

            return (
              <Link
                key={item.name}
                href={item.disabled ? "#" : item.href}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-[#2d1b4e] text-[#a78bfa] font-medium shadow-[0_0_20px_rgba(139,92,246,0.15)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Icon className={`size-5 ${isActive ? "text-[#a78bfa]" : "group-hover:scale-110 transition-transform"}`} />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <ChevronRight className="size-4 opacity-50" />
                )}
                {/* Special icon for Resume Builder if needed, mostly handled by Icon prop */}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer / Back to Home */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          <LogOut className="size-5 rotate-180" />
          <span>Back to Home</span>
        </Link>
      </div>
    </aside>
  );
}
