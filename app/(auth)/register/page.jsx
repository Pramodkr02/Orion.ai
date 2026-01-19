"use client";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
      <h2 className="text-2xl font-semibold">Sign Up</h2>
      <p className="text-slate-300 mt-1">Create your account</p>

      <form className="mt-8" onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-1 font-medium text-slate-300">
          Name
        </label>
        <input
          type="name"
          id="name"
          name="name"
          placeholder="Name"
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
          placeholder="Email"
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
          placeholder="Password"
          className="w-full p-2 mb-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div className="text-right">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full mt-10 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
