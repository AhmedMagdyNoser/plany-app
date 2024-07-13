import { Outlet } from "react-router-dom";
import Header from "@/components/global/Header";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-l-bg-1 text-l-txt-semi transition-colors dark:bg-d-bg-1 dark:text-d-txt-semi">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
