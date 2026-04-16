import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Shield, Ticket } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm transition ${
    isActive ? "bg-white text-slate-900" : "text-white/80 hover:bg-white/10 hover:text-white"
  }`;

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="section-wrap flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-brand.orange to-brand.yellow p-3 shadow-fun" />
          <div>
            <p className="font-display text-xl font-bold">FunWorld</p>
            <p className="text-xs text-white/60">Park. Play. Repeat.</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/rides" className={navClass}>Rides</NavLink>
          <NavLink to="/book" className={navClass}>Book</NavLink>
          {auth.user && <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>}
          {auth.user?.role === "admin" && <NavLink to="/admin" className={navClass}>Admin</NavLink>}
        </nav>
        <div className="flex items-center gap-3">
          {auth.user ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">{auth.user.name}</p>
                <p className="text-xs text-white/60">{auth.user.role}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
            >
              <Ticket size={16} />
              Login
            </Link>
          )}
          {auth.user?.role === "admin" && (
            <Link to="/admin" className="hidden rounded-full bg-brand.orange px-4 py-2 text-sm font-semibold md:inline-flex">
              <Shield size={16} className="mr-2" />
              Manage Park
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

