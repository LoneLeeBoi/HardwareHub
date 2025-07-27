import { AdminHeader } from "./_Adminlayout/AdminHeader";
import { Sidebar } from "./_Adminlayout/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />

      {/* Sidebar + Page Content   */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 border-r">
          <Sidebar />
        </aside>

        {/* Page content */}
        <main className="flex-1 px-4 w-full overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
