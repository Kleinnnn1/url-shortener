import { useState } from "react";
import Hero from "./components/Hero";
import RecentLinks from "./components/RecentLinks";
import type { Link } from "./types";

export default function App() {
  const [links, setLinks] = useState<Link[]>([
    {
      short: "shrt.ly/x9k2pq",
      original: "https://github.com/yourname/url-shortener-project",
      clicks: 142,
    },
    {
      short: "shrt.ly/m3nwrt",
      original: "https://www.figma.com/file/abc123/design-system-portfolio",
      clicks: 87,
    },
    {
      short: "shrt.ly/p7qlza",
      original: "https://vercel.app/deployments/tinkerpro-dashboard",
      clicks: 31,
    },
  ]);

  const addLink = (newLink: Link) => {
    setLinks((prev) => [newLink, ...prev]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-16 px-4">
      <Hero onShorten={addLink} />
      <RecentLinks links={links} />
    </div>
  );
}
