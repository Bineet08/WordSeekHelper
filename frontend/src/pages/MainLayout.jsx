import { useState, useEffect, useRef } from "react";
import PatternInput from "../components/PatternInput";
import ResultList from "../components/ResultList";
import { solveWord } from "../api";

export default function MainLayout() {
  const [pattern, setPattern] = useState(["_", "_", "_", "_", "_"]);
  const [included, setIncluded] = useState("");
  const [excluded, setExcluded] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const includedRef = useRef(null);
  const excludedRef = useRef(null);
  const patternRef = useRef(null);

  const clearBoard = () => {
    setPattern(["_", "_", "_", "_", "_"]);
    setIncluded("");
    setExcluded("");
    setResult(null);
  };

  const solve = async () => {
    setLoading(true);
    try {
      const data = await solveWord({
        pattern: pattern.join(""),
        included,
        excluded
      });
      setResult(data);
    } catch (err) {
      console.error("❌ Error calling backend:", err);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = pattern.every(ch => ch === "_") && included.trim() === "" && excluded.trim() === "";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") clearBoard();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter" && !isEmpty && !loading) {
        solve();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isEmpty, loading, pattern, included, excluded]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-zinc-900 rounded-xl shadow-2xl p-8 space-y-6">
        <PatternInput 
          pattern={pattern} 
          setPattern={setPattern}
          includedRef={includedRef}
          excludedRef={excludedRef}
          patternRef={patternRef}
        />
        
        <input
          ref={includedRef}
          placeholder="Included letters"
          value={included}
          onChange={e => setIncluded(e.target.value.toLowerCase())}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              excludedRef.current?.focus();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              patternRef.current?.focus();
            }
          }}
          className="w-full px-4 py-3 bg-zinc-800 text-gray-100 border-2 border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-500"
        />
        
        <input
          ref={excludedRef}
          placeholder="Excluded letters"
          value={excluded}
          onChange={e => setExcluded(e.target.value.toLowerCase())}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              patternRef.current?.focus();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              includedRef.current?.focus();
            }
          }}
          className="w-full px-4 py-3 bg-zinc-800 text-gray-100 border-2 border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-500"
        />
        
        <div className="flex gap-3">
          <button 
            onClick={clearBoard}
            className="flex-1 px-6 py-3 bg-zinc-800 text-gray-100 font-semibold rounded-lg hover:bg-zinc-700 transition-all active:scale-95"
          >
            Clear
          </button>
          <button 
            onClick={solve} 
            disabled={isEmpty || loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 hover:shadow-lg hover:shadow-blue-500/30"
          >
            {loading ? "Solving…" : "Solve"}
          </button>
        </div>

        <ResultList result={result} loading={loading} />
      </div>
    </main>
  );
}