import Link from "next/link";
import React from "react";

export default function SidebarNavigation({ icon: Icon, route, title }) {
  return (
    <Link
      href={route}
      className="flex gap-2 items-center px-4 py-2 hover:bg-gray-200 rounded transition-all duration-200"
    >
      <div className="text-xl">
        <Icon className={`w-6 h-6`}/>
      </div>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
}
