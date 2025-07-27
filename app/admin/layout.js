import { AdminHeader } from "./_Adminlayout/AdminHeader";
import { Sidebar } from "./_Adminlayout/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      {/* Sidebar + Page Content */}
      <div className="flex flex-1">
        {/* Sidebar - Fixed width */}
        <aside className="w-64 bg-gray-100 border-r flex-shrink-0">
          <Sidebar />
        </aside>
        {/* Page content - Takes remaining width */}
        <main className="flex-1 min-w-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}