import { useEffect } from "react";
import type { Link } from "../types";

type Props = {
  links: Link[];
  loading: boolean;
};

export default function RecentLinks({ links, loading }: Props) {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-xl">
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "#333" }}
        >
          Recent links
        </p>
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg px-4 py-3"
              style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}
            >
              <div className="flex flex-col gap-2 w-full mr-4">
                <div
                  className="h-3 rounded"
                  style={{
                    background: "#1a1a1a",
                    width: "50%",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <div
                  className="h-2 rounded"
                  style={{
                    background: "#1a1a1a",
                    width: "80%",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
              </div>
              <div
                className="h-5 w-14 rounded shrink-0"
                style={{
                  background: "#1a1a1a",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (links.length === 0) return null;

  return (
    <div className="w-full max-w-xl">
      <p
        className="text-xs tracking-widest uppercase mb-3"
        style={{ color: "#333" }}
      >
        Recent links
      </p>
      <div className="flex flex-col gap-2">
        {links.map((link, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 cursor-pointer"
            style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}
            onClick={() => window.open(link.short, "_blank")}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00d4aa33";
              e.currentTarget.style.background = "#0a1a18";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1a1a1a";
              e.currentTarget.style.background = "#0f0f0f";
            }}
          >
            <div className="flex flex-col gap-1 min-w-0 mr-4">
              <span
                className="text-sm font-medium"
                style={{ color: "#00d4aa" }}
              >
                {link.short}
              </span>
              <span className="text-xs truncate" style={{ color: "#333" }}>
                {link.original}
              </span>
            </div>
            <span
              className="text-xs shrink-0 rounded px-2 py-1"
              style={{ color: "#00d4aa", background: "#0a2e28" }}
            >
              {link.clicks} clicks
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
