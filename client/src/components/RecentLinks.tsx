import type { Link } from "../types";

type Props = {
  links: Link[];
};

export default function RecentLinks({ links }: Props) {
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
            className="flex items-center justify-between rounded-lg px-4 py-3"
            style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}
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
