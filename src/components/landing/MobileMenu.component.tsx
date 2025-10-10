import React from "react";
import { BRAND } from "../../types/types";
import { Button } from "../ui/button";

export function MobileMenuButton() {
  const [open, setOpen] = React.useState(false);
  // metti lo stato in window per condividerlo col pannello (semplice e locale)
  (window as any).__navOpen = open;
  return (
    <button
      onClick={() => setOpen((v) => !((window as any).__navOpen = !v))}
      className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
      aria-label="Apri menù"
      aria-expanded={open}
    >
      {open ? (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

export function MobileMenuPanel() {
  // legge lo stato impostato dal bottone (evita prop-drilling se header è inlined)
  const [, force] = React.useState(0);
  const open = (window as any).__navOpen ?? false;

  React.useEffect(() => {
    const id = setInterval(() => force((x) => x + 1), 100); // piccolo sync polling
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`sm:hidden overflow-hidden border-t border-slate-200 transition-[max-height,opacity] duration-300 ${
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="flex flex-col gap-2 py-4">
        {[
          { href: "#come-funziona", label: "Come funziona" },
          { href: "#roadmap", label: "Roadmap" },
          { href: "#tokenomics", label: "Rendite" },
          { href: "#faq", label: "FAQ" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            onClick={() => ((window as any).__navOpen = false)}
          >
            {item.label}
          </a>
        ))}

        <div className="mt-2 flex items-center gap-2 px-2">
          <Button variant="outline" size="sm" className="flex-1">
            {BRAND.ctaSecondary}
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-amber-500 to-pink-500 text-white"
          >
            {BRAND.ctaPrimary}
          </Button>
        </div>
      </div>
    </div>
  );
}
