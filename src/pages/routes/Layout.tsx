import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>Header</header>
      <Outlet />
    </div>
  );
}

export default Layout;
