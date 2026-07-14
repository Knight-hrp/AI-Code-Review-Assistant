import { useState } from "react";
import Navbar from "../components/Navbar";

function History() {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            title: "Authentication Token Expiry check",
            language: "javascript",
            score: 85,
            status: "Completed",
            date: "2026-07-10",
            issues: 3,
        },
        {
            id: 2,
            title: "Database connection leak fix",
            language: "python",
            score: 92,
            status: "Completed",
            date: "2026-07-09",
            issues: 1,
        },
        {
            id: 3,
            title: "Add unit tests for registration route",
            language: "javascript",
            score: 74,
            status: "Needs Action",
            date: "2026-07-06",
            issues: 7,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterLang, setFilterLang] = useState("all");

    const filteredReviews = reviews.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLang = filterLang === "all" || r.language === filterLang;
        return matchesSearch && matchesLang;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Review History</h1>
                        <p className="text-slate-500 mt-1">Browse, filter, and manage your past AI code reviews.</p>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search reviews by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <select
                            value={filterLang}
                            onChange={(e) => setFilterLang(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Languages</option>
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="go">Go</option>
                        </select>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {filteredReviews.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            No reviews found matching the criteria.
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {filteredReviews.map((review) => (
                                <div key={review.id} className="p-6 hover:bg-slate-50 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-slate-900">{review.title}</h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono uppercase">
                                                {review.language}
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                Submitted on {review.date}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 self-stretch sm:self-auto justify-between border-t border-slate-50 sm:border-0 pt-4 sm:pt-0">
                                        <div className="text-right">
                                            <div className="text-sm text-slate-500">Issues Found</div>
                                            <div className="font-bold text-slate-900">{review.issues}</div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <div className="text-sm text-slate-500">Quality Score</div>
                                            <span className={`inline-block text-sm font-bold px-2 py-1 rounded ${
                                                review.score >= 90 
                                                    ? 'bg-emerald-50 text-emerald-700' 
                                                    : review.score >= 80 
                                                        ? 'bg-blue-50 text-blue-700' 
                                                        : 'bg-amber-50 text-amber-700'
                                            }`}>
                                                {review.score}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default History;
