import React from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

// Mostra l'intro solo una volta per sessione
const SEEN_KEY = "intro_seen_v1";

export default function IntroHouseReveal() {
  const [show, setShow] = React.useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem(SEEN_KEY) ? false : true;
  });

  // Rispetta prefers-reduced-motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    if (!show) return;
    // blocca lo scroll durante l’intro
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(
      () => {
        endIntro();
      },
      prefersReduced ? 300 : 2000
    );
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  function endIntro() {
    sessionStorage.setItem(SEEN_KEY, "1");
    setShow(false);
  }

  // ESC / click per skip
  React.useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && endIntro();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  if (!show) return null;

  // Variants per i pezzi della casa (roof L/R, body L/R, door)
  const piece = (dx = 0, dy = 0, delay = 0) => ({
    initial: { opacity: 0, x: 0, y: 0 },
    animate: {
      opacity: 1,
      x: prefersReduced ? 0 : dx,
      y: prefersReduced ? 0 : dy,
    },
    exit: { opacity: 0, x: 0, y: 0 },
    transition: {
      duration: 0.9,
      ease: cubicBezier(0.2, 0.8, 0.2, 1), // <-- qui
      delay,
    },
  });

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.35 } }}
        className="fixed inset-0 z-[100] bg-white"
        onClick={endIntro}
        aria-label="Intro animation overlay"
      >
        {/* Glow / gradiente */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-slate-50" />

        {/* Casa “puzzle” al centro */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Ombra soft */}
            <motion.ellipse
              cx="110"
              cy="160"
              rx="70"
              ry="12"
              fill="rgba(0,0,0,0.06)"
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            />
            {/* Roof left */}
            <motion.path
              d="M30 100 L110 40 L110 70 L60 110 Z"
              fill="#0f172a"
              {...piece(-18, -16, 0.05)}
            />
            {/* Roof right */}
            <motion.path
              d="M110 40 L190 100 L140 110 L110 70 Z"
              fill="#111827"
              {...piece(18, -16, 0.08)}
            />
            {/* Body left */}
            <motion.rect
              x="52"
              y="110"
              width="56"
              height="60"
              rx="6"
              fill="#e2e8f0"
              {...piece(-14, 10, 0.12)}
            />
            {/* Body right */}
            <motion.rect
              x="112"
              y="110"
              width="56"
              height="60"
              rx="6"
              fill="#cbd5e1"
              {...piece(14, 10, 0.16)}
            />
            {/* Door */}
            <motion.rect
              x="98"
              y="130"
              width="24"
              height="40"
              rx="4"
              fill="#0ea5e9"
              {...piece(0, 16, 0.22)}
            />
          </motion.svg>
        </div>

        {/* Cross-fade bianco: tutto diventa bianco, poi dal bianco appare la pagina */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }} // 1) entra il bianco, 2) poi svanisce
          transition={{
            duration: prefersReduced ? 0.5 : 1.4, // totale del cross-fade
            times: [0, 0.5, 1], // metà tempo bianco pieno
            ease: "easeInOut",
            delay: prefersReduced ? 0.1 : 0.6, // avvio dopo i pezzi
          }}
          className="absolute inset-0 bg-white"
        />

        {/* CTA skip (opzionale) */}
        <button
          onClick={endIntro}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 hover:text-slate-700"
        >
          salta intro ↘
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
