import { ArrowRight, House } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function MarketplaceHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[2000] border-b border-slate-200/80 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 opacity-30 blur" />
              <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-black text-white shadow-lg">
                <House className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate text-lg font-bold tracking-tight">
                CasaChain
              </span>
              <Badge variant="secondary" className="shrink-0">
                alpha
              </Badge>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="rounded-full border border-slate-200 bg-white/70 backdrop-blur px-2 py-1 shadow-sm">
              <nav className="flex items-center">
                {[
                  { href: "/", label: "Marketplace" },
                  { href: "#financials", label: "Financials" },
                  { href: "#scenari", label: "Scenari" },
                  { href: "#join", label: "Partecipa" },
                ].map((item, i, arr) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative mx-1 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100/80 hover:text-slate-900"
                  >
                    <span className="relative z-10">{item.label}</span>
                    {i < arr.length - 1 && (
                      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-5 w-px bg-slate-200/70" />
                    )}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="font-medium hover:bg-slate-100"
            >
              Whitepaper
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md hover:opacity-90"
            >
              Join waitlist <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
