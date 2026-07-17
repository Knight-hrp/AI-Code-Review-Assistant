import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function History() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLang, setFilterLang] = useState("all");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get("/reviews");
                setReviews(response.data);
            } catch (err) {
                console.error("Failed to fetch history:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const filteredReviews = reviews.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLang = filterLang === "all" || r.language === filterLang;
        return matchesSearch && matchesLang;
    });

    const getScoreColor = (score) => {
        if (score >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
        if (score >= 50) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
        return "text-red-400 bg-red-500/10 border-red-500/20";
    };

    const getSeverityLabel = (count) => {
        if (count === 0) return { text: "No issues", cls: "text-emerald-400" };
        if (count <= 2) return { text: `${count} issue${count > 1 ? "s" : ""}`, cls: "text-amber-400" };
        return { text: `${count} issues`, cls: "text-red-400" };
    };

    return (
        <div className="min-h-dvh bg-[#0b0f1a] w-full">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 page-enter">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Review History</h1>
                    <p className="text-slate-400 mt-1 text-sm sm:text-base">Browse and manage your past code reviews.</p>
                </div>

                {/* Filters */}
                <div className="glass rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row gap-3.5 mb-8 sm:mb-10">
                    <div className="flex-1 relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search reviews…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full text-sm text-white placeholder-slate-500 bg-white/[0.04] border border-white/[0.06] focus:outline-none focus:border-indigo-500/50 transition search-input-md"
                        />
                    </div>
                    <select
                        value={filterLang}
                        onChange={(e) => setFilterLang(e.target.value)}
                        className="w-full sm:w-48 text-sm text-white bg-white/[0.04] border border-white/[0.06] focus:outline-none focus:border-indigo-500/50 transition appearance-none cursor-pointer select-input-md"
                    >
                        <option value="all" className="bg-slate-900">All Languages</option>
                        <option value="javascript" className="bg-slate-900">JavaScript</option>
                        <option value="typescript" className="bg-slate-900">TypeScript</option>
                        <option value="python" className="bg-slate-900">Python</option>
                        <option value="java" className="bg-slate-900">Java</option>
                        <option value="go" className="bg-slate-900">Go</option>
                        <option value="go" className="bg-slate-900">C</option>
                        <option value="go" className="bg-slate-900">Cpp</option>
                    </select>
                </div>

                {/* Reviews List */}
                <div className="space-y-4 mt-8 sm:mt-10">
                    {loading ? (
                        <div className="glass rounded-2xl p-12 text-center">
                            <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-sm text-slate-500">Loading reviews…</p>
                        </div>
                    ) : filteredReviews.length === 0 ? (
                        <div className="glass rounded-2xl p-12 text-center">
                            <div className="text-4xl mb-3">🔍</div>
                            <p className="text-slate-400 font-medium">No reviews found</p>
                            <p className="text-sm text-slate-500 mt-1">Try a different search or filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:gap-5">
                            {filteredReviews.map((review) => {
                                const score = review.review_output?.score || 0;
                                const issues = review.review_output?.suggestions?.length || 0;
                                const severity = getSeverityLabel(issues);
                                const date = new Date(review.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

                                return (
                                    <Link to={`/review/${review.id}`} key={review.id} className="block group">
                                        <div className="glass rounded-2xl p-6 sm:p-7 hover:border-indigo-500/35 hover:bg-white/[0.02] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-8">
                                            {/* Info */}
                                            <div className="flex-1 min-w-0 space-y-2.5">
                                                <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-white transition truncate">{review.title}</h3>
                                                <div className="flex items-center gap-2.5 flex-wrap">
                                                    <span className="text-[11px] font-mono text-slate-400 uppercase bg-white/[0.06] border border-white/[0.08] px-2.5 py-0.5 rounded-md">{review.language}</span>
                                                    <span className="text-xs text-slate-500">Submitted on {date}</span>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 shrink-0 border-t border-white/[0.04] sm:border-0 pt-4 sm:pt-0">
                                                <div className="text-left sm:text-right space-y-1">
                                                    <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Issues</p>
                                                    <p className={`text-sm sm:text-base font-bold ${severity.cls}`}>{severity.text}</p>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Score</p>
                                                    <span className={`inline-block text-sm sm:text-base font-bold px-3 py-1 rounded-lg border ${getScoreColor(score)}`}>
                                                        {score}%
                                                    </span>
                                                </div>
                                                <svg className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition hidden sm:block shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default History;
