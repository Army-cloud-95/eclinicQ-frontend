import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar className="w-64" />

  <div className="flex flex-col flex-1">
    <Navbar className="w-full" /> 
    <div className="flex-1 overflow-y-auto">
      <Outlet />
    </div>
  </div>
</div>

  );
}