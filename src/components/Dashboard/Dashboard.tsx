import type { ReactNode } from "react";
import Sidebar from "./SubComponents/Sidebar";
import Topbar from "./SubComponents/Topbar";

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        {/* Page Content */}
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
