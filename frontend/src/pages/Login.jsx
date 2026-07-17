import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh w-full flex items-center justify-center px-6 py-16 bg-[#0b0f1a] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-500/[0.07] blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.05] blur-[100px] pointer-events-none" />

            <div className="w-full max-w-xl relative page-enter">
                <div className="glass rounded-3xl px-10 py-14 sm:px-14 sm:py-16">
                    {/* Logo */}
                    <div className="flex justify-center mb-10">
                        <Link to="/" className="flex items-center gap-3.5 hover:opacity-90 transition">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 18 22 12 16 6" />
                                    <polyline points="8 6 2 12 8 18" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-white">Code<span className="text-indigo-400">Review</span></span>
                        </Link>
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Welcome back</h1>
                        <p className="text-lg text-slate-400">Sign in to continue to your dashboard</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 text-red-400 text-sm px-4 py-3.5 rounded-xl border border-red-500/20 flex items-center gap-2.5 mb-8">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <label className="text-base font-medium text-slate-300">Email</label>
                            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-base font-medium text-slate-300">Password</label>
                            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="pt-4">
                            <Button text={loading ? "Signing in…" : "Sign in"} type="submit" disabled={loading} />
                        </div>
                    </form>

                    <div className="text-center text-base text-slate-500 mt-10">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
