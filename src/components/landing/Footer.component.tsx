import { House } from "lucide-react";
import { BRAND } from "../../types/types";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center">
              <House className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">{BRAND.name}</div>
              <div className="text-xs text-slate-500">{BRAND.tagline}</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 max-w-2xl">
            <p>
              Disclaimer: progetto in fase di ricerca e sviluppo. Le
              informazioni hanno scopo illustrativo e potrebbero non riflettere
              l’implementazione finale. Nessuna offerta al pubblico, né
              sollecitazione al risparmio. La partecipazione potrà richiedere
              KYC/AML e dipendere da vincoli normativi.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} {BRAND.name}. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
