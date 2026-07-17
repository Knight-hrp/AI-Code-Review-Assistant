import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Review() {
    const { id } = useParams();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await api.get(`/reviews/${id}`);
                setReview(response.data);
            } catch (err) {
                console.error("Failed to fetch review:", err);
                setError("Review not found or you don't have access.");
            } finally {
                setLoading(false);
            }
        };
        fetchReview();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-dvh bg-[#0b0f1a]">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Loading review…</p>
                </main>
            </div>
        );
    }

    if (error || !review) {
        return (
            <div className="min-h-dvh bg-[#0b0f1a]">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
                        <p className="text-slate-400 text-sm mb-6">{error}</p>
                        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition">
                            ← Back to Dashboard
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const score = review.review_output?.score || 0;
    const summary = review.review_output?.summary || "";
    const bugs = review.review_output?.bugs || [];
    const suggestions = review.review_output?.suggestions || [];
    const date = new Date(review.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const getScoreRing = () => {
        if (score >= 80) return { stroke: "#34d399", bg: "text-emerald-400", label: "Great" };
        if (score >= 50) return { stroke: "#fbbf24", bg: "text-amber-400", label: "Needs Work" };
        return { stroke: "#f87171", bg: "text-red-400", label: "Critical" };
    };
    const scoreInfo = getScoreRing();

    const getSeverityStyle = (severity) => {
        switch (severity?.toLowerCase()) {
            case "high": return "bg-red-500/10 text-red-400 border-red-500/20";
            case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case "low": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    const getTypeStyle = (type) => {
        switch (type?.toLowerCase()) {
            case "security": return "bg-red-500/10 text-red-400";
            case "bug": return "bg-orange-500/10 text-orange-400";
            case "performance": return "bg-amber-500/10 text-amber-400";
            case "style": return "bg-blue-500/10 text-blue-400";
            case "best practice": return "bg-purple-500/10 text-purple-400";
            default: return "bg-slate-500/10 text-slate-400";
        }
    };

    return (
        <div className="min-h-dvh bg-[#0b0f1a] w-full">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 page-enter">
                {/* Breadcrumb */}
                <div className="mb-5">
                    <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-indigo-400 transition">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                        Dashboard
                    </Link>
                </div>

                {/* Review Header */}
                <div className="glass rounded-2xl p-5 sm:p-6 mb-6 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
                    <div className="space-y-2 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                                {review.language}
                            </span>
                            <span className="text-[11px] text-slate-500">{date}</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{review.title}</h1>
                        {summary && <p className="text-sm text-slate-400 line-clamp-2">{summary}</p>}
                    </div>

                    {/* Score circle */}
                    <div className="flex flex-col items-center shrink-0">
                        <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="34" strokeWidth="6" stroke="rgba(255,255,255,0.05)" fill="none" />
                                <circle cx="40" cy="40" r="34" strokeWidth="6" stroke={scoreInfo.stroke} fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(score / 100) * 213.6} 213.6`}
                                    style={{ transition: "stroke-dasharray 1s ease" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`text-xl font-bold ${scoreInfo.bg}`}>{score}</span>
                            </div>
                        </div>
                        <span className={`text-[11px] font-medium mt-1 ${scoreInfo.bg}`}>{scoreInfo.label}</span>
                    </div>
                </div>

                {/* Bugs banner */}
                {bugs.length > 0 && (
                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            <span className="text-sm font-semibold text-red-400">Bugs Detected ({bugs.length})</span>
                        </div>
                        <ul className="space-y-1">
                            {bugs.map((bug, i) => (
                                <li key={i} className="text-sm text-red-300/80 pl-5 relative before:content-['•'] before:absolute before:left-1.5 before:text-red-500">{bug}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Code Viewer */}
                    <div className="rounded-2xl overflow-hidden border border-white/[0.06] flex flex-col bg-[#0d1117]">
                        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2 bg-[#161b22]">
                            <div className="flex gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                            </div>
                            <span className="text-xs font-mono text-slate-500 ml-2">{review.title}.{review.language === "python" ? "py" : review.language === "javascript" ? "js" : review.language}</span>
                        </div>
                        <pre className="p-5 overflow-x-auto code-block text-slate-300 flex-1 max-h-[600px] overflow-y-auto">
                            <code>{review.code}</code>
                        </pre>
                    </div>

                    {/* Suggestions */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">AI Suggestions</h2>
                            <span className="text-xs text-slate-500">{suggestions.length} finding{suggestions.length !== 1 ? "s" : ""}</span>
                        </div>

                        {suggestions.length === 0 ? (
                            <div className="glass rounded-2xl p-8 text-center">
                                <div className="text-4xl mb-3">✅</div>
                                <p className="text-white font-medium">Looks great!</p>
                                <p className="text-sm text-slate-400 mt-1">No issues found in this code.</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                                {suggestions.map((s, idx) => (
                                    <div key={s.id || idx} className="glass rounded-xl p-4 space-y-3 hover:border-white/[0.1] transition">
                                        {/* Header badges */}
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${getTypeStyle(s.type)}`}>
                                                    {s.type}
                                                </span>
                                                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${getSeverityStyle(s.severity)}`}>
                                                    {s.severity}
                                                </span>
                                            </div>
                                            {s.line && (
                                                <span className="text-[11px] font-mono text-slate-500 bg-white/[0.04] px-2 py-0.5 rounded">
                                                    Line {s.line}
                                                </span>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <p className="text-sm text-slate-300 leading-relaxed">{s.message}</p>

                                        {/* Fix */}
                                        {s.suggestion && (
                                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
                                                <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">💡 Recommended Fix</p>
                                                <p className="text-sm text-slate-300 font-mono leading-relaxed">{s.suggestion}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Review;
