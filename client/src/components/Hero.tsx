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

  const handleShorten = () => {
    if (!url) return setError("Please enter a URL.");
    if (!isValidUrl(url))
      return setError("Please enter a valid URL including https://");

    setError("");
    const code = Math.random().toString(36).substring(2, 8);
    const shortened = `shrt.ly/${code}`;
    setResult(shortened);
    onShorten({ short: shortened, original: url, clicks: 0 });
    setUrl("");
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
        style={{ color: "rgba(180,160,255,0.6)" }}
      >
        URL Shortener
      </p>

      <h1 className="text-3xl font-semibold text-white text-center mb-2">
        Shorten any link instantly
      </h1>
      <p
        className="text-sm text-center mb-8"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Paste your long URL and get a clean, shareable link
      </p>

      <div
        className="w-full rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
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
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.8)",
            }}
          />
          <button
            onClick={handleShorten}
            className="h-11 px-5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: "rgba(160,130,255,0.25)",
              border: "1px solid rgba(160,130,255,0.4)",
              color: "rgba(200,180,255,0.9)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(160,130,255,0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(160,130,255,0.25)")
            }
          >
            Shorten ↗
          </button>
        </div>

        {/* Error */}
        {error && (
          <p
            className="text-xs mt-2"
            style={{ color: "rgba(255,100,100,0.8)" }}
          >
            {error}
          </p>
        )}

        {result && (
          <>
            <hr
              className="my-5"
              style={{
                border: "none",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            />
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Your shortened link
            </p>
            <div
              className="flex items-center justify-between rounded-lg px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(180,160,255,0.9)" }}
              >
                {result}
              </span>
              <button
                onClick={handleCopy}
                className="text-xs rounded px-3 py-1 transition-all duration-150"
                style={{
                  color: copied
                    ? "rgba(100,220,150,0.9)"
                    : "rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
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
