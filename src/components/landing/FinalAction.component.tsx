import { BRAND, FUNDING } from "../../types/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";

const toEUR = (n: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export default function FinalActionSection() {
  const progress = Math.min(
    100,
    Math.round((FUNDING.raisedEUR / FUNDING.targetEUR) * 100)
  );
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm relative">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold">
                Pronti a costruire il primo portafoglio immobiliare della
                community?
              </h3>
              <p className="mt-2 text-slate-600">
                Unisciti alla waitlist per ricevere accesso anticipato al
                whitepaper e al primo pool.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
                <Input
                  placeholder={BRAND.emailCapturePlaceholder}
                  type="email"
                  className="h-11"
                />
                <Button className="h-11 px-6" variant="outline">
                  {BRAND.ctaPrimary}
                </Button>
              </div>
            </div>
            <div>
              <div className="rounded-2xl bg-slate-900 text-white p-6">
                <div className="text-sm text-slate-300">
                  Stato raccolta pilota
                </div>
                <div className="text-3xl font-semibold mt-1">{progress}%</div>
                <Progress value={progress} className="h-2 mt-4 bg-white/20" />
                <div className="mt-4 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Raccolti</span>
                    <span className="font-medium">
                      {toEUR(FUNDING.raisedEUR)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Obiettivo</span>
                    <span className="font-medium">
                      {toEUR(FUNDING.targetEUR)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sostenitori</span>
                    <span className="font-medium">
                      {FUNDING.backers.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-100 blur-3xl opacity-60" />
        </div>
      </div>
    </section>
  );
}
