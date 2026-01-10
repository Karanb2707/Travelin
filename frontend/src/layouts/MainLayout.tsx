import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-12 px-6">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
