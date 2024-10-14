import { Outlet } from "react-router-dom";
import Header from "@/components/global/nav";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
