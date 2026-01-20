import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white flex font-sans selection:bg-indigo-500/30">
      <Sidebar />
      <main className="flex-1 ml-72 p-8 transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
