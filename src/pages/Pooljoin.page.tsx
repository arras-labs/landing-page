import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { useMetaMask } from "../hooks/meta.hook";
import { Link, useParams } from "react-router-dom";
import { ContributionForm } from "../components/ContributionForm.component";
import { ShieldCheck, Wallet2 } from "lucide-react";
import { POOLS, type Pool } from "../types/types";

function getPoolById(id?: string | number | null): Pool | null {
  if (!id) return null;
  const key = String(id).padStart(3, "0");
  return POOLS[key] ?? null;
}

function formatAddr(addr?: string) {
  if (!addr) return "-";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

const toEUR = (n: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export function PoolJoinPage() {
  const params = useParams();
  const pool = getPoolById(params.id ?? "001");
  const mm = useMetaMask();
  if (!pool) return <div className="p-6">Pool non trovato</div>;

  return (
    <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Badge variant="secondary">Join</Badge>
        <h1 className="text-3xl font-semibold mt-2">{pool.title}</h1>
        <p className="text-slate-600">{pool.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Connessione wallet */}
          <Card className="relative overflow-hidden border-slate-200">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center">
                    <Wallet2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Connetti MetaMask</CardTitle>
                    <CardDescription>
                      Richiesto per firmare le transazioni.
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant={mm.account ? "default" : "outline"}
                  className={
                    mm.account
                      ? "bg-emerald-600 text-white hover:bg-emerald-600"
                      : ""
                  }
                >
                  {mm.account ? "Connesso" : "Non connesso"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mm.account ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-700">
                      Connesso come{" "}
                      <span className="font-mono font-medium">
                        {formatAddr(mm.account)}
                      </span>
                    </div>
                    <Badge variant="outline">Chain {mm.chainId ?? "?"}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-emerald-700">
                    Pronto a firmare transazioni per questo pool.
                  </p>
                </div>
              ) : (
                <>
                  <Button
                    onClick={mm.connect}
                    className="w-full h-11 gap-2"
                    variant="outline"
                  >
                    <Wallet2 className="h-5 w-5" />
                    Connetti MetaMask
                  </Button>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li className="flex gap-2">
                      <ShieldCheck className="h-4 w-4 mt-0.5" /> Firma sicura e
                      non‑custodial
                    </li>
                    <li className="flex gap-2">
                      <ShieldCheck className="h-4 w-4 mt-0.5" /> Indirizzo e
                      stato visibili
                    </li>
                  </ul>
                </>
              )}
              {!mm.isAvailable && (
                <p className="text-sm text-red-600">
                  MetaMask non rilevato. Installa l’estensione e ricarica la
                  pagina.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Importo e invio */}
          <ContributionForm pool={pool} />

          {/* Info */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Come funziona il versamento</CardTitle>
              <CardDescription>
                Deposito → Escrow → Acquisto → Payout
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 space-y-2">
              <p>
                I depositi vengono registrati on‑chain. Raggiunta la soglia, il
                contratto esegue l’acquisto e le future rendite saranno
                distribuite proporzionalmente.
              </p>
              <p>
                Se la soglia non viene raggiunta entro la deadline, i fondi
                restano prelevabili secondo la policy del pool.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sticky sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {" "}
            {/* top-24 tiene conto dell'header */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Riepilogo</CardTitle>
                <CardDescription>Dati attuali del pool</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Target</span>
                  <span className="font-medium">{toEUR(pool.targetEUR)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Raccolti</span>
                  <span className="font-medium">{toEUR(pool.raisedEUR)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sostenitori</span>
                  <span className="font-medium">
                    {pool.backers.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rendimento stimato</span>
                  <span className="font-medium">{pool.yieldEstimate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Scadenza</span>
                  <span className="font-medium">{pool.deadline}</span>
                </div>
                <Separator className="my-2" />
                <Button asChild className="w-full">
                  <Link to={`/pool/${pool.id}`}>Apri il pool su chain</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
