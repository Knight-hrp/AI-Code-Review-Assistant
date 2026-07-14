import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

function Dashboard() {
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [recentReviews, setRecentReviews] = useState([
        {
            id: 1,
            title: "Authentication Token Expiry check",
            language: "javascript",
            score: 85,
            status: "Completed",
            date: "2026-07-10",
        },
        {
            id: 2,
            title: "Database connection leak fix",
            language: "python",
            score: 92,
            status: "Completed",
            date: "2026-07-09",
        },
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code.trim() || !title.trim()) return;

        setLoading(true);
        // Mock review creation
        setTimeout(() => {
            const newReview = {
                id: recentReviews.length + 1,
                title,
                language,
                score: Math.floor(Math.random() * 20) + 80, // random score 80-100
                status: "Completed",
                date: new Date().toISOString().split("T")[0],
            };
            setRecentReviews([newReview, ...recentReviews]);
            setTitle("");
            setCode("");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Dashboard Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Code Review Dashboard</h1>
                    <p className="text-slate-500 mt-1">Submit code snippets to receive instant, AI-powered feedback and suggestions.</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Reviews</span>
                        <div className="flex items-baseline mt-4">
                            <span className="text-4xl font-bold text-slate-900">{recentReviews.length}</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Quality Score</span>
                        <div className="flex items-baseline mt-4">
                            <span className="text-4xl font-bold text-emerald-600">
                                {recentReviews.length > 0 
                                    ? Math.round(recentReviews.reduce((acc, curr) => acc + curr.score, 0) / recentReviews.length) 
                                    : 0}%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Languages Analysed</span>
                        <div className="flex items-baseline mt-4">
                            <span className="text-4xl font-bold text-slate-900">
                                {new Set(recentReviews.map(r => r.language)).size}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* New Review Request */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <h2 className="text-xl font-bold text-slate-900">Submit Code for AI Review</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                    Review Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Refactor API handler"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                    Programming Language
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="go">Go</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                    Source Code
                                </label>
                                <textarea
                                    rows="10"
                                    placeholder="Paste your code here..."
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <Button
                                text={loading ? "Analyzing Code..." : "Start Review"}
                                type="submit"
                                disabled={loading}
                            />
                        </form>
                    </div>

                    {/* Recent Reviews Panel */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <h2 className="text-xl font-bold text-slate-900">Recent Reviews</h2>
                        <div className="space-y-4">
                            {recentReviews.length === 0 ? (
                                <p className="text-slate-400 text-sm">No reviews found.</p>
                            ) : (
                                recentReviews.map((review) => (
                                    <div key={review.id} className="p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-slate-50 transition">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <h3 className="text-sm font-semibold text-slate-800 line-clamp-1">{review.title}</h3>
                                                <span className="inline-block text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono uppercase">
                                                    {review.language}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-block text-xs font-bold px-2 py-1 rounded ${
                                                    review.score >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                                }`}>
                                                    Score: {review.score}%
                                                </span>
                                                <p className="text-2xs text-slate-400 mt-1">{review.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
