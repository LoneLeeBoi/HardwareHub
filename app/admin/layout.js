import { Sidebar } from "./_Adminlayout/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sm:flex flex-1">
        <aside className="sm:w-64 bg-gray-100 border-r sm:flex-shrink-0">
          <Sidebar />
        </aside>
        <main className="sm:flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}