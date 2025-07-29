import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setShowSidebar(true)} />
        <main className="p-4 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
