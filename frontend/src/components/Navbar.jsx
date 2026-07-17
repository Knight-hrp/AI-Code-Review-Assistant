import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const navLinks = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/history", label: "History" },
        { to: "/profile", label: "Profile" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b0f1a]/85 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                            </svg>
                        </div>
                        <span className="text-base font-bold text-white tracking-tight">
                            Code<span className="text-indigo-400">Review</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1.5">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                                    isActive(link.to)
                                        ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
                                        : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/[0.03]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* User + Logout */}
                    <div className="hidden md:flex items-center gap-3">
                        {user && (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.04]">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0">
                                    {user.name?.[0]?.toUpperCase() || "U"}
                                </div>
                                <span className="text-xs text-slate-300 font-medium pr-1">{user.name}</span>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-all duration-200 cursor-pointer"
                            title="Log out"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
                        aria-label="Toggle menu"
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-white/[0.06] px-6 pb-5 pt-3 space-y-2 bg-[#0b0f1a]/95 backdrop-blur-xl">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                                isActive(link.to)
                                    ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
                                    : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/[0.03]"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    
                    {user && (
                        <div className="flex items-center justify-between border-t border-white/[0.04] pt-3 mt-1 px-4">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                    {user.name?.[0]?.toUpperCase() || "U"}
                                </div>
                                <span className="text-xs text-slate-300 font-medium">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;