"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signup(name, email, password);
    } catch (error) {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
      <h2 className="text-2xl font-semibold">Sign Up</h2>
      <p className="text-slate-300 mt-1">Create your account</p>

      <form className="mt-8" onSubmit={handleSubmit}>
        <label
          htmlFor="name"
          className="block mb-1 font-medium text-slate-300"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
          className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label
          htmlFor="email"
          className="block mb-1 font-medium text-slate-300"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label
          htmlFor="password"
          className="block mb-1 font-medium text-slate-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 mb-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-10 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing up...
              </>
          ) : "Sign up"}
        </button>
      </form>
       <div className="mt-4 text-center text-slate-400">
         Already have an account?{" "}
         <Link href="/login" className="text-indigo-500 hover:text-indigo-400 font-medium">
            Log in
         </Link>
       </div>
    </div>
  );
}
