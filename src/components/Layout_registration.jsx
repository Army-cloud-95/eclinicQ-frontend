import { Outlet } from "react-router-dom";
import SidebarSteps from "./SidebarSteps";

const Layout_registration = () => {
  return (
    <div className="h-screen flex bg-gray-100 p-3 gap-3 overflow-hidden">
      {/* Sidebar - Fixed */}
      <div className="flex-shrink-0">
        <SidebarSteps />
      </div>

      {/* Main + Footer - Fixed height container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer - Fixed */}
        <footer className="flex-shrink-0 p-4 border-t border-gray-200 flex justify-between bg-white">
          <button className="px-4 py-2 rounded-lg border border-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            Save & Next →
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Layout_registration;
