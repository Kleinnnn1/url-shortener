import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import RecentLinks from "./components/RecentLinks";
import type { Link } from "./types";

export default function App() {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/links`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map(
          (item: {
            shortCode: string;
            originalUrl: string;
            clicks: number;
          }) => ({
            short: `${import.meta.env.VITE_API_URL}/${item.shortCode}`,
            original: item.originalUrl,
            clicks: item.clicks,
          }),
        );
        setLinks(mapped);
      })
      .catch(() => console.error("Failed to fetch links"));
  }, []);

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
