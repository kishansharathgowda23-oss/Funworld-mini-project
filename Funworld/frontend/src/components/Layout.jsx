import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pb-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;

