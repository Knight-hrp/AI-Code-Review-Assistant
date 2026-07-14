import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Review() {
    const { id } = useParams();

    // Mock review detail
    const review = {
        id: id || "1",
        title: "Authentication Token Expiry check",
        language: "javascript",
        score: 85,
        date: "2026-07-10",
        code: `const jwt = require('jsonwebtoken');

function generateToken(user) {
    // BUG: Missing token expiry setting
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
}

function verifyRequest(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}`,
        suggestions: [
            {
                id: 1,
                type: "Security",
                severity: "High",
                message: "Missing token expiration time in jwt.sign call. Tokens that do not expire present a security risk if compromised.",
                suggestion: "Pass `{ expiresIn: '1d' }` as the third parameter to jwt.sign.",
                line: 5,
            },
            {
                id: 2,
                type: "Style",
                severity: "Low",
                message: "Use camelCase consistently for variable naming or double quotes for strings.",
                suggestion: "Change single quotes to double quotes for standard formatting.",
                line: 1,
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back to dashboard */}
                <div className="mb-6">
                    <Link to="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="space-y-1">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono uppercase">
                            {review.language}
                        </span>
                        <h1 className="text-2xl font-bold text-slate-900">{review.title}</h1>
                        <p className="text-sm text-slate-400">Reviewed on {review.date}</p>
                    </div>

                    <div className="text-right">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Quality Score</div>
                        <span className={`inline-block text-3xl font-extrabold px-4 py-2 rounded-xl ${
                            review.score >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                            {review.score}%
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Pane: Code Viewer */}
                    <div className="bg-slate-900 text-slate-100 rounded-2xl overflow-hidden shadow-lg border border-slate-800 flex flex-col">
                        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Source Code</span>
                        </div>
                        <pre className="p-6 overflow-x-auto font-mono text-sm leading-relaxed flex-1">
                            <code>{review.code}</code>
                        </pre>
                    </div>

                    {/* Right Pane: AI Findings & Suggestions */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900">AI Feedback & Suggestions</h2>
                        <div className="space-y-4">
                            {review.suggestions.map((suggestion) => (
                                <div key={suggestion.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                            suggestion.type === "Security" ? "bg-red-50 text-red-700 border border-red-100" : "bg-blue-50 text-blue-700 border border-blue-100"
                                        }`}>
                                            {suggestion.type} • {suggestion.severity} Severity
                                        </span>
                                        <span className="text-xs text-slate-400 font-mono">Line {suggestion.line}</span>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{suggestion.message}</p>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                                        <div className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">Recommended Fix</div>
                                        <p className="text-sm font-mono text-slate-800">{suggestion.suggestion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Review;
