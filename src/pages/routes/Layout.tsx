import { Outlet } from "react-router-dom";
import Header from "@/components/global/Header";

function Layout() {
  return (
    <div className="bg-l-bg-1 dark:bg-d-bg-1 min-h-screen transition-colors">
      <Header />
      <div className="container p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
