import React from "react";

export default function SplitHoverCard({
  left,
  right,
  className = "",
  minHeight = "h-72", // altezza minima del contenitore
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  minHeight?: string; // es. "h-80"
}) {
  const [hovered, setHovered] = React.useState<"left" | "right" | null>(null);

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile: stack verticale senza effetti */}
      <div className="md:hidden space-y-4">
        <div
          className={`w-full rounded-xl border border-slate-200 bg-white ${minHeight}`}
        >
          {left}
        </div>
        <div
          className={`w-full rounded-xl border border-slate-200 bg-white ${minHeight}`}
        >
          {right}
        </div>
      </div>

      {/* Desktop: split 50/50 con espansione on hover */}
      <div className={`hidden md:flex gap-4 ${minHeight}`}>
        <div
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
          className={[
            "rounded-xl border border-slate-200 bg-white overflow-hidden",
            "transition-all duration-300 ease-out",
            hovered === "left"
              ? "flex-[4_1_0%] shadow-lg"
              : hovered === "right"
              ? "flex-[1_1_0%] opacity-80"
              : "flex-[1_1_0%]",
          ].join(" ")}
        >
          <div className="h-full w-full">{left}</div>
        </div>

        <div
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          className={[
            "rounded-xl border border-slate-200 bg-white overflow-hidden",
            "transition-all duration-300 ease-out",
            hovered === "right"
              ? "flex-[4_1_0%] shadow-lg"
              : hovered === "left"
              ? "flex-[1_1_0%] opacity-80"
              : "flex-[1_1_0%]",
          ].join(" ")}
        >
          <div className="h-full w-full">{right}</div>
        </div>
      </div>
    </div>
  );
}
