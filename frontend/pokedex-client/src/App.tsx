import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Pokemon = { id: number; name: string; image: string };

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Pokemon | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE as string;

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setNotFound(false);

    try {
      const res = await fetch(`${API_BASE}/api/pokemon/${query.trim()}`);
      if (res.status === 404) setNotFound(true);
      else if (res.ok) setResult(await res.json());
      else setNotFound(true);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-800 text-gray-100 flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-indigo-400 mt-10 mb-8">
        Pokédex
      </h1>

      {/* Pokémon Image */}
      {result && (
        <img
          src={result.image}
          alt={result.name}
          className="w-40 h-40 object-contain mb-6 drop-shadow-lg"
        />
      )}

      {/* Search Form */}
      <form onSubmit={onSearch} className="flex w-full max-w-md gap-3">
        <Input
          placeholder='Type a name, e.g. "pikachu"'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-6 py-5 rounded-xl border-2 border-indigo-500 bg-gray-900 text-white"
        />
        <Button
          type="submit"
          disabled={loading}
          className="px-6 py-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          {loading ? "Searching…" : "Search"}
        </Button>
      </form>

      {/* Error message */}
      {notFound && (
        <p className="text-red-500 mt-4 text-center">
          Sorry, that Pokémon doesn’t exist.
        </p>
      )}

      {/* Footer hint */}
      <p className="mt-12 text-sm text-center text-gray-500">
        Try: Pikachu, Bulbasaur, Charizard…
      </p>
    </main>
  );
}

export default App;
