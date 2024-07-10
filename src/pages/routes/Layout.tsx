import { Outlet } from "react-router-dom";
import Header from "@/components/global/Header";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
