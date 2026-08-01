export default function Home() {
    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl font-bold">
                        Personalized Coding Mentor
                    </h1>

                    <p className="text-gray-400 mt-2">
                        AI-Powered Student Coding Assistant
                    </p>
                </header>

                {/* Main Layout */}
                <div className="grid grid-cols-3 gap-6">

                    {/* Left Panel */}
                    <div className="col-span-2 bg-slate-900 rounded-xl p-6 h-[500px]">

                        <h2 className="text-xl font-semibold">
                            Code Editor
                        </h2>

                    </div>

                    {/* Right Panel */}
                    <div className="bg-slate-900 rounded-xl p-6 h-[500px]">

                        <h2 className="text-xl font-semibold">
                            AI Analysis
                        </h2>

                    </div>

                </div>

                {/* Bottom Panel */}
                <div className="bg-slate-900 rounded-xl p-6 mt-6 h-[220px]">

                    <h2 className="text-xl font-semibold">
                        Program Output
                    </h2>

                </div>

            </div>

        </div>
    );
}