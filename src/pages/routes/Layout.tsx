import { Outlet } from "react-router-dom";
import Header from "@/components/global/Header";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col transition-colors">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
