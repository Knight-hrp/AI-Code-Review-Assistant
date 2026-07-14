import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/dashboard" className="flex items-center space-x-2">
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                AI Reviewer
                            </span>
                        </Link>
                        <div className="hidden md:flex space-x-6 text-sm font-medium">
                            <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition">
                                Dashboard
                            </Link>
                            <Link to="/history" className="text-slate-600 hover:text-blue-600 transition">
                                History
                            </Link>
                            <Link to="/profile" className="text-slate-600 hover:text-blue-600 transition">
                                Profile
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user && (
                            <span className="hidden sm:inline text-sm text-slate-600 font-medium">
                                Hi, {user.name}
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="text-sm font-semibold text-slate-700 hover:text-red-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
