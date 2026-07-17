import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-dvh flex flex-col items-center justify-center px-4 text-center bg-[#0b0f1a] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.05] blur-[120px] pointer-events-none" />

            <div className="relative page-enter">
                <h1 className="text-[120px] sm:text-[160px] font-black text-white/[0.04] leading-none tracking-tighter select-none">404</h1>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-indigo-500/25 uppercase tracking-wider">
                        Page Not Found
                    </span>
                </div>
            </div>

            <p className="text-slate-400 text-sm sm:text-base mt-8 max-w-md leading-relaxed">
                The page you're looking for doesn't exist or may have been moved.
            </p>

            <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 transition-all duration-200"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Back to Home
            </Link>
        </div>
    );
}

export default NotFound;
