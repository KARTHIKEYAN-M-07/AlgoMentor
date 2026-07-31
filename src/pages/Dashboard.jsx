import Header from "../components/Header";
import EditorPanel from "../components/EditorPanel";
import AnalysisPanel from "../components/AnalysisPanel";
import OutputPanel from "../components/OutputPanel";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <Header />

        {/* Main Grid: 12 Columns on Desktop */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex flex-col">
            <EditorPanel />
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <AnalysisPanel />
          </div>
        </main>

        {/* Full-width Output Panel */}
        <OutputPanel />
      </div>
    </div>
  );
}
