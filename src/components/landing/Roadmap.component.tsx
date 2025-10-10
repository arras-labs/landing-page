import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, Sparkles } from "lucide-react";

// ⬇️ Import from your shadcn/ui setup
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

/**
 * RoadmapSection — versione corretta e tipata
 * - Nessun hover: resta illuminata SOLO la card attiva
 * - Attiva selezionabile via props (activeIndex o activeTitle) con fallback su "MVP"
 * - Niente doppio scroll; layout responsive e anti-overflow
 */

type RoadmapItem = {
  q: string;
  title: string;
  items: string[];
};

type Props = {
  ROADMAP: RoadmapItem[];
  activeIndex?: number;
  activeTitle?: string;
};

export default function RoadmapSection({
  ROADMAP,
  activeIndex,
  activeTitle,
}: Props) {
  const resolvedActive = React.useMemo(() => {
    if (typeof activeIndex === "number" && !Number.isNaN(activeIndex)) {
      return Math.max(0, Math.min(ROADMAP.length - 1, activeIndex));
    }
    if (activeTitle) {
      const idx = ROADMAP.findIndex(
        (r) => r.title.toLowerCase() === activeTitle.toLowerCase()
      );
      if (idx !== -1) return idx;
    }
    const mvpIdx = ROADMAP.findIndex((r) => /\bmvp\b/i.test(r.title));
    return mvpIdx !== -1 ? mvpIdx : 0;
  }, [ROADMAP, activeIndex, activeTitle]);

  const container = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  } as const;

  return (
    <section
      id="roadmap"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <Badge variant="secondary" className="inline-flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5" /> Roadmap
        </Badge>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Il percorso verso il primo immobile
        </h2>
        <p className="mt-2 text-slate-600">
          Step chiari, milestone misurabili, trasparenza sui rilasci.
        </p>
      </div>

      {/* Grid responsive e anti-overflow */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 auto-rows-fr"
      >
        {ROADMAP.map((r, i) => {
          const isActive = i === resolvedActive;
          return (
            <motion.div
              key={i}
              variants={item}
              layout
              className="min-w-0 h-full"
            >
              <Card
                className={[
                  "relative min-w-0 h-full flex flex-col transition-all duration-300 will-change-transform",
                  isActive
                    ? "border-transparent ring-2 ring-indigo-500/60 shadow-xl shadow-indigo-200/60"
                    : "border-slate-200/60 opacity-60",
                ].join(" ")}
              >
                {/* Active glow / gradient border */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="glow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "radial-gradient(60% 60% at 50% 0%, rgba(99,102,241,0.20), transparent 70%)",
                      }}
                    />
                  )}
                </AnimatePresence>

                <CardHeader className="min-w-0 relative z-[1]">
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <Badge
                      variant="outline"
                      className={[
                        "shrink-0 transition-colors",
                        isActive ? "border-indigo-400 text-indigo-700" : "",
                      ].join(" ")}
                    >
                      <Calendar className="h-3.5 w-3.5 mr-1" /> {r.q}
                    </Badge>

                    {isActive ? (
                      <Badge className="shrink-0">In corso</Badge>
                    ) : (
                      <Badge variant="secondary" className="shrink-0">
                        Prossimo
                      </Badge>
                    )}
                  </div>
                  <CardTitle
                    className={[
                      "text-lg mt-2 truncate min-w-0 transition-colors",
                      isActive ? "text-slate-900" : "text-slate-700",
                    ].join(" ")}
                    title={r.title}
                  >
                    {r.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="min-w-0 grow relative z-[1]">
                  <motion.ul
                    layout
                    className="space-y-2 text-sm min-w-0"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {r.items.map((it, j) => (
                      <li key={j} className="flex gap-2 min-w-0">
                        <ChevronRight
                          className={[
                            "h-4 w-4 mt-0.5 shrink-0 transition-transform",
                            isActive ? "translate-x-0" : "-translate-x-0.5",
                          ].join(" ")}
                        />
                        <span className="break-words">{it}</span>
                      </li>
                    ))}
                  </motion.ul>
                </CardContent>

                {isActive && (
                  <motion.div
                    layout
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      maskImage:
                        "radial-gradient(70% 70% at 50% 0%, black, transparent)",
                    }}
                  >
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-indigo-500/40 via-indigo-400/20 to-transparent" />
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Legend (opzionale) */}
      <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <span className="size-2 rounded-full bg-indigo-500/80" /> Attiva
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-2 rounded-full bg-slate-300" /> Sbiadita (in
          arrivo)
        </span>
      </div>
    </section>
  );
}
