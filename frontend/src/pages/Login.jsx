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
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("login response: ", response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-slate-100">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-slate-500">
                        Sign in to your AI Code Reviewer account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                            Password
                        </label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        text={loading ? "Logging in..." : "Login"}
                        type="submit"
                        disabled={loading}
                    />
                </form>

                <div className="text-center text-sm text-slate-600 pt-2">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;