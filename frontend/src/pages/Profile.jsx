import Navbar from "../components/Navbar";

function Profile() {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : { name: "User", email: "user@example.com" };

    const infoFields = [
        { label: "Full Name", value: user.name },
        { label: "Email Address", value: user.email },
        { label: "Account Role", value: "Developer" },
        { label: "AI Model", value: "Gemini 3.1 Flash Lite" },
    ];

    return (
        <div className="min-h-dvh bg-[#0b0f1a] w-full">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 page-enter">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Profile</h1>
                    <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your account information.</p>
                </div>

                <div className="max-w-2xl">
                    <div className="glass rounded-2xl overflow-hidden">
                        {/* Avatar header banner */}
                        <div className="h-28 bg-gradient-to-r from-indigo-600/30 to-purple-600/30" />

                        {/* Profile Info Header overlay */}
                        <div className="px-6 pb-6 -mt-10 sm:-mt-12 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 border-b border-white/[0.04]">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-xl shadow-indigo-500/20 border-4 border-[#0f1320] shrink-0">
                                {user.name?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div className="space-y-1 pb-1">
                                <h2 className="text-xl sm:text-2xl font-bold text-white leading-none">{user.name}</h2>
                                <p className="text-sm text-slate-400">{user.email}</p>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {infoFields.map((field) => (
                                    <div key={field.label} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
                                        <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">{field.label}</p>
                                        <p className="text-sm font-medium text-white">{field.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;
