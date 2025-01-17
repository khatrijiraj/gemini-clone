import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-row overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <Main toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default App;
