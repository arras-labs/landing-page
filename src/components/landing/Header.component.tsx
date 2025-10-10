import { ArrowRight, House } from "lucide-react";
import { Button } from "../ui/button";
import { MobileMenuButton, MobileMenuPanel } from "./MobileMenu.component";
import { BRAND } from "../../types/types";
import { Badge } from "../ui/badge";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="h-16 flex items-center justify-between gap-3">
          {/* LEFT: Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 opacity-30 blur transition-opacity duration-200" />
              <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-black text-white shadow-lg">
                <House className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate text-lg font-bold tracking-tight">
                {BRAND.name}
              </span>
              <Badge variant="secondary" className="shrink-0">
                alpha
              </Badge>
            </div>
          </div>

          {/* CENTER: Nav (desktop) — pill container */}
          <div className="hidden md:flex items-center justify-center">
            <div className="rounded-full border border-slate-200 bg-white/70 backdrop-blur px-2 py-1 shadow-sm">
              <nav className="flex items-center">
                {[
                  { href: "#come-funziona", label: "Come funziona" },
                  { href: "#roadmap", label: "Roadmap" },
                  { href: "#tokenomics", label: "Rendite" },
                  { href: "#faq", label: "FAQ" },
                ].map((item, i, arr) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative mx-1 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100/80 hover:text-slate-900"
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* underline accent on hover */}
                    <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-amber-500 to-pink-500 transition-transform duration-200 group-hover:scale-x-100" />
                    {/* subtle divider between pills */}
                    {i < arr.length - 1 && (
                      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-5 w-px bg-slate-200/70" />
                    )}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* RIGHT: CTAs (desktop) */}
          <div className="hidden sm:flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="font-medium hover:bg-slate-100"
            >
              {BRAND.ctaSecondary}
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md transition-opacity duration-200 hover:opacity-90"
            >
              {BRAND.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <MobileMenuButton />
        </div>

        {/* Mobile panel */}
        <MobileMenuPanel />
      </div>
    </header>
  );
}
