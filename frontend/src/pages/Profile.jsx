import Navbar from "../components/Navbar";

function Profile() {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : { name: "User", email: "user@example.com" };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Profile</h1>
                    <p className="text-slate-500 mt-1">Manage your account information and preferences.</p>
                </div>

                <div className="max-w-3xl bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 md:p-8 space-y-6">
                        {/* Profile Info Header */}
                        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                                {user.name ? user.name[0].toUpperCase() : "U"}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                                <p className="text-slate-500">{user.email}</p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div>
                                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Full Name</span>
                                <span className="text-slate-800 font-medium">{user.name}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email Address</span>
                                <span className="text-slate-800 font-medium">{user.email}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Account Role</span>
                                <span className="text-slate-800 font-medium">Developer</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Integrations</span>
                                <span className="text-slate-800 font-medium">GitHub (Connected)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;
