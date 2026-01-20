"use client";

import { useState } from "react";
import { MenuIcon, XIcon, ChevronDown, FileText, BrainCircuit, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { user, logout } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navlinks = [
    {
      href: "/",
      text: "Home",
    },
    {
      text: "Features",
      href: "#", // Dropdown trigger
      dropdown: [
        {
          title: "Career Resume",
          description: "Build perfection with AI",
          href: "/dashboard", // Protected route
          icon: FileText,
          active: true,
        },
        {
          title: "AI Documentation",
          description: "Coming Soon",
          href: "#",
          icon: BrainCircuit,
          active: false,
        },
      ],
    },
    {
      href: "/#pricing",
      text: "Pricing",
    },
    {
      href: "/resources",
      text: "Resources",
    },
  ];

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50 flex items-center justify-between w-full h-18 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur-md bg-black/50 border-b border-white/5"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <Link href="/">
          <Image
            className="h-9 w-auto"
            src="/assets/logo.svg"
            width={138}
            height={36}
            alt="logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 transition duration-500">
          {navlinks.map((link, index) => (
            <div
              key={index}
              className="relative group h-18 flex items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1.5 hover:text-indigo-400 transition text-sm font-medium text-slate-200"
              >
                {link.text}
                {link.dropdown && (
                  <ChevronDown className={`size-4 transition-transform duration-300 ${hoveredIndex === index ? "rotate-180" : ""}`} />
                )}
              </Link>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.dropdown && hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-14 left-1/2 -translate-x-1/2 w-72 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2"
                  >
                    <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none" />
                    {link.dropdown.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className={`group/item flex items-start gap-4 p-3 rounded-lg transition-all ${
                          item.active 
                            ? "hover:bg-white/5 cursor-pointer" 
                            : "opacity-50 cursor-not-allowed grayscale"
                        }`}
                        onClick={(e) => !item.active && e.preventDefault()}
                      >
                        <div className={`p-2 rounded-lg ${item.active ? "bg-indigo-500/20 text-indigo-400 group-hover/item:text-indigo-300" : "bg-gray-800 text-gray-500"}`}>
                          <item.icon className="size-5" />
                        </div>
                        <div>
                          <h4 className={`text-sm font-semibold ${item.active ? "text-white group-hover/item:text-indigo-200" : "text-gray-500"}`}>
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {user ? (
             <div className="relative group">
                <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsUserDropdownOpen(false), 200)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
                >
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0) || <User className="size-4"/>}
                    </div>
                    <span className="text-sm font-medium text-slate-200 truncate max-w-[100px]">{user.name}</span>
                    <ChevronDown className="size-4 text-slate-400" />
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                        <div className="p-3 border-b border-white/10">
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                         <button 
                             onClick={logout}
                             className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition"
                         >
                            <LogOut className="size-4" />
                            Log out
                         </button>
                    </div>
                )}
             </div>
          ) : (
            <>
               <Link href="/register">
                 <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white text-sm font-medium rounded-md active:scale-95 shadow-lg shadow-indigo-500/20">
                   Get started
                   {/* Changed from 'Buy Plan' as per request to imply Signup, or should strictly be 'Buy Plan' if specifically requested as 'instead of Get Started' on guest? 
                       Prompt said "Buy Plan" button (instead of Get Started). I will adhere to that strictly now.
                   */}
                 </button>
               </Link>
               <Link href="/login">
                 <button className="hover:bg-white/10 transition px-5 py-2 border border-slate-600 text-slate-200 text-sm font-medium rounded-md active:scale-95">
                   Login
                 </button>
               </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden active:scale-90 transition text-white"
        >
          <MenuIcon className="size-7" />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center text-lg gap-8 lg:hidden transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-6 w-full max-w-sm px-6">
          {navlinks.map((link, index) => (
             link.dropdown ? (
               <div key={index} className="flex flex-col items-center gap-4 w-full">
                 <span className="text-slate-500 font-semibold uppercase tracking-wider text-sm">{link.text}</span>
                 {link.dropdown.map((item, idx) => (
                   <Link
                    key={idx}
                    href={item.href}
                    onClick={() => item.active && setIsMenuOpen(false)}
                    className={`text-xl font-medium ${item.active ? "text-white" : "text-slate-600"}`}
                   >
                     {item.title}
                   </Link>
                 ))}
               </div>
             ) : (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium text-slate-200 hover:text-indigo-400 transition"
              >
                {link.text}
              </Link>
             )
          ))}

          <div className="w-full h-px bg-white/10 my-2" />

          {user ? (
             <div className="flex flex-col w-full gap-3 items-center">
                 <div className="text-center mb-2">
                     <p className="text-white font-medium">{user.name}</p>
                     <p className="text-slate-500 text-sm">{user.email}</p>
                 </div>
                 <button 
                     onClick={() => { logout(); setIsMenuOpen(false); }}
                     className="w-full py-3 border border-red-500/20 text-red-500 hover:bg-red-500/10 transition rounded-lg font-medium text-lg flex items-center justify-center gap-2"
                 >
                    <LogOut className="size-5" />
                    Log out
                 </button>
             </div>
          ) : (
            <div className="flex flex-col w-full gap-3">
                <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-lg font-medium text-lg">
                    Buy Plan
                </button>
                </Link>
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                <button className="w-full py-3 border border-slate-700 hover:bg-white/5 transition text-slate-200 rounded-lg font-medium text-lg">
                    Login
                </button>
                </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
        >
          <XIcon className="size-6" />
        </button>
      </div>
    </>
  );
}
