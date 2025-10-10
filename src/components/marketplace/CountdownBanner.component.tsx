import { Timer } from "lucide-react";
import React from "react";

export default function CountdownBanner({ targetISO }: { targetISO: string }) {
  const [left, setLeft] = React.useState(getLeft());
  function getLeft() {
    const now = new Date().getTime();
    const t = new Date(targetISO).getTime();
    const diff = Math.max(0, t - now);
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    return { d, h, m };
  }
  React.useEffect(() => {
    const id = setInterval(() => setLeft(getLeft()), 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center gap-3 text-sm">
      <Timer className="h-4 w-4 text-amber-700" />
      <div className="text-amber-800">
        <span className="font-semibold">Deadline raccolta: </span>
        mancano{" "}
        <span className="font-semibold">
          {left.d}g {left.h}h {left.m}m
        </span>
        .
      </div>
    </div>
  );
}
