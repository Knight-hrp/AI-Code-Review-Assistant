import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <h1 className="text-9xl font-black text-slate-200 tracking-widest">404</h1>
            <div className="bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-md uppercase tracking-wider rotate-12 absolute mb-20 shadow-md">
                Page Not Found
            </div>
            <p className="text-slate-500 text-lg mt-6 max-w-md">
                Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
            <Link to="/dashboard" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200">
                Go to Dashboard
            </Link>
        </div>
    );
}

export default NotFound;
