import { Link, Navigate } from "react-router-dom";

function Home() {
    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    const features = [
        {
            title: "Instant AI review",
            description: "Paste your code and get clear, actionable feedback in seconds.",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
            ),
        },
        {
            title: "Quality scores",
            description: "See how your code ranks and what to improve next.",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
                </svg>
            ),
        },
        {
            title: "Review history",
            description: "Keep every review in one place so you can track progress over time.",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-dvh bg-[#0b0f1a] text-slate-200 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-indigo-500/[0.08] blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/[0.05] blur-[120px] pointer-events-none" />

            {/* Top nav */}
            <header className="relative z-10 border-b border-white/[0.06]">
                <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">
                            Code<span className="text-indigo-400">Review</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 hover:brightness-110 transition"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <main className="relative z-10 page-enter">
                <section className="max-w-6xl mx-auto px-6 sm:px-8 pt-20 sm:pt-28 pb-20 text-center">
                    <p className="text-indigo-400 font-semibold text-sm tracking-wide mb-5">
                        AI-powered code reviews
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
                        Ship cleaner code with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            instant feedback
                        </span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Paste your code, get a quality score, and see what to fix — no setup required. Create an account to start reviewing.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/45 hover:brightness-110 transition-all"
                        >
                            Get started — Sign up
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-200 rounded-xl bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] transition-all"
                        >
                            Log in
                        </Link>
                    </div>
                </section>

                {/* Features */}
                <section className="max-w-6xl mx-auto px-6 sm:px-8 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-7 py-8"
                            >
                                <div className="w-11 h-11 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-5">
                                    {feature.icon}
                                </div>
                                <h2 className="text-lg font-semibold text-white mb-2">{feature.title}</h2>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/[0.06] py-8">
                <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <span>© {new Date().getFullYear()} CodeReview</span>
                    <div className="flex items-center gap-6">
                        <Link to="/login" className="hover:text-slate-300 transition">Log in</Link>
                        <Link to="/register" className="hover:text-slate-300 transition">Sign up</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
