import { FiCode, FiMoon } from "react-icons/fi";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 shadow-lg">

            {/* Left */}
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <FiCode size={22} />
                </div>

                <div>
                    <h1 className="font-bold text-xl">
                        Personalized Coding Mentor
                    </h1>

                    <p className="text-sm text-gray-400">
                        AI-Powered Student Coding Assistant
                    </p>
                </div>
            </div>

            {/* Right */}
            <button className="bg-slate-700 hover:bg-slate-600 p-3 rounded-lg transition">
                <FiMoon size={20} />
            </button>

        </nav>
    );
}