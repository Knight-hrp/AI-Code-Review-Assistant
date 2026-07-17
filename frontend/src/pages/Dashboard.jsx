import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import api from "../services/api";

function Dashboard() {
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [recentReviews, setRecentReviews] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get("/reviews");
                setRecentReviews(response.data);
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code.trim() || !title.trim()) return;
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/reviews", { title, language, code });
            const newReview = response.data.review;
            navigate(`/review/${newReview.id}`);
        } catch (err) {
            console.error("Failed to submit review:", err);
            setError("Failed to analyze code. Please try again.");
            setLoading(false);
        }
    };

    const totalReviews = recentReviews.length;
    let avgScore = 0;
    if (totalReviews > 0) {
        const totalScore = recentReviews.reduce((acc, curr) => acc + (curr.review_output?.score || 0), 0);
        avgScore = Math.round(totalScore / totalReviews);
    }
    const uniqueLanguages = new Set(recentReviews.map(r => r.language)).size;

    const stats = [
        { label: "Total Reviews", value: totalReviews, icon: "📊", color: "from-indigo-500/20 to-indigo-500/5" },
        { label: "Avg. Score", value: `${avgScore}%`, icon: "⚡", color: "from-emerald-500/20 to-emerald-500/5" },
        { label: "Languages", value: uniqueLanguages, icon: "🌐", color: "from-purple-500/20 to-purple-500/5" },
    ];

    const getScoreColor = (score) => {
        if (score >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
        if (score >= 50) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
        return "text-red-400 bg-red-500/10 border-red-500/20";
    };

    return (
        <div className="min-h-dvh bg-[#0b0f1a] w-full">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 sm:py-12 page-enter">
                {/* Header */}
                <div className="mb-10 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Dashboard</h1>
                    <p className="text-slate-400 mt-2.5 text-sm sm:text-base">Submit code for instant AI-powered review and feedback.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-14">
                    {stats.map((stat) => (
                        <div key={stat.label} className={`relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br ${stat.color} p-6`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-3xl font-bold text-white mt-3">{stat.value}</p>
                                </div>
                                <span className="text-2xl">{stat.icon}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Submit Form */}
                    <div className="lg:col-span-2 glass rounded-2xl p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-white">New Review</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-500/10 text-red-400 text-sm px-4 py-3 rounded-xl border border-red-500/20">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2.5">Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Refactor API handler"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2.5">Language</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl text-sm text-white bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="javascript" className="bg-slate-900">JavaScript</option>
                                    <option value="typescript" className="bg-slate-900">TypeScript</option>
                                    <option value="python" className="bg-slate-900">Python</option>
                                    <option value="java" className="bg-slate-900">Java</option>
                                    <option value="go" className="bg-slate-900">Go</option>
                                    <option value="c" className="bg-slate-900">C</option>
                                    <option value="cpp" className="bg-slate-900">C++</option>
                                    <option value="rust" className="bg-slate-900">Rust</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2.5">Source Code</label>
                                <textarea
                                    rows="10"
                                    placeholder="Paste your code here..."
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-slate-500 bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all font-[var(--font-mono)] leading-relaxed resize-y"
                                    required
                                />
                            </div>

                            <div className="pt-1">
                                <Button text={loading ? "Analyzing…" : "Start Review"} type="submit" disabled={loading} />
                            </div>
                        </form>
                    </div>

                    {/* Recent Reviews */}
                    <div className="glass rounded-2xl p-6 sm:p-8 space-y-6 h-fit lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Recent Reviews</h2>
                            {recentReviews.length > 0 && (
                                <Link to="/history" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition">View all →</Link>
                            )}
                        </div>

                        <div className="space-y-3">
                            {recentReviews.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="text-3xl mb-3">📝</div>
                                    <p className="text-sm text-slate-500">No reviews yet. Submit code to get started!</p>
                                </div>
                            ) : (
                                recentReviews.slice(0, 8).map((review) => {
                                    const score = review.review_output?.score || 0;
                                    const date = new Date(review.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });

                                    return (
                                        <Link to={`/review/${review.id}`} key={review.id} className="block group">
                                            <div className="p-4 rounded-xl border border-white/[0.04] hover:border-indigo-500/20 hover:bg-white/[0.02] transition-all duration-200">
                                                <div className="flex justify-between items-start gap-3">
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="text-sm font-medium text-slate-200 truncate group-hover:text-white transition">{review.title}</h3>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className="text-[11px] font-mono text-slate-500 uppercase bg-white/[0.04] px-1.5 py-0.5 rounded">{review.language}</span>
                                                            <span className="text-[11px] text-slate-500">{date}</span>
                                                        </div>
                                                    </div>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-lg border shrink-0 ${getScoreColor(score)}`}>
                                                        {score}%
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;