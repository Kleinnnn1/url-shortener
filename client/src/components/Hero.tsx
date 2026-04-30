import { useState } from "react";
import type { Link } from "../types";

type Props = {
  onShorten: (link: Link) => void;
};

export default function Hero({ onShorten }: Props) {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const isValidUrl = (str: string): boolean => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!url) return setError("Please enter a URL.");
    if (!isValidUrl(url))
      return setError("Please enter a valid URL including https://");

    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/links/shorten`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originalUrl: url }),
        },
      );
      const data = await response.json();
      if (!response.ok) return setError(data.error || "Something went wrong.");
      const fullShort = `${import.meta.env.VITE_API_URL}/${data.shortCode}`;
      setResult(fullShort);
      onShorten({
        short: fullShort,
        original: data.originalUrl,
        clicks: data.clicks,
      });
      setUrl("");
    } catch {
      setError("Could not connect to server.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center mb-10">

      <p
        className="text-xs tracking-widest uppercase mb-4"
        style={{ color: "#00d4aa" }}
      >
        URL Shortener
      </p>

      {/* Heading */}
      <h1 className="text-3xl font-semibold text-white text-center mb-2">
        Shorten any link instantly
      </h1>
      <p className="text-sm text-center mb-8" style={{ color: "#444" }}>
        Paste your long URL and get a clean, shareable link
      </p>

      <div
        className="w-full rounded-2xl p-6"
        style={{ background: "#111", border: "1px solid #1e1e1e" }}
      >

        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleShorten()}
            placeholder="https://your-long-url.com/..."
            className="flex-1 h-11 rounded-lg px-4 text-sm outline-none"
            style={{
              background: "#0f0f0f",
              border: "1px solid #1e1e1e",
              color: "#fff",
            }}
          />
          <button
            onClick={handleShorten}
            className="h-11 px-5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ background: "#00d4aa", color: "#003d2e" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#00bfa0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#00d4aa")}
          >
            Shorten
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs mt-2" style={{ color: "#f87171" }}>
            {error}
          </p>
        )}

        {/* Result */}
        {result && (
          <>
            <hr
              className="my-5"
              style={{ border: "none", borderTop: "1px solid #1e1e1e" }}
            />
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: "#333" }}
            >
              Your shortened link
            </p>
            <div
              className="flex items-center justify-between rounded-lg px-4 py-3"
              style={{ background: "#0f0f0f", border: "1px solid #1e1e1e" }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: "#00d4aa" }}
              >
                {result}
              </span>
              <button
                onClick={handleCopy}
                className="text-xs rounded px-3 py-1 transition-all duration-150"
                style={{
                  color: copied ? "#00d4aa" : "#555",
                  background: "#161616",
                  border: "1px solid #1e1e1e",
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
