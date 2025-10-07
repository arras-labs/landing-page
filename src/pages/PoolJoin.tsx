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
import { ContributionForm } from "./ContributionForm";

function getPoolById(id?: string | number | null): Pool | null {
  if (!id) return null;
  const key = String(id).padStart(3, "0");
  return POOLS[key] ?? null;
}

function formatAddr(addr?: string) {
  if (!addr) return "-";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

const FUNDING = {
  targetEUR: 250_000,
  raisedEUR: 167_400,
  backers: 842,
};

// Modello dati minimale per i pool
export type Pool = {
  id: string;
  title: string;
  description?: string;
  targetEUR: number;
  raisedEUR: number;
  backers: number;
  network: string;
  poolAddress: `0x${string}`;
  yieldEstimate?: number;
  deadline?: string;
};

const POOLS: Record<string, Pool> = {
  "001": {
    id: "001",
    title: "Pool Immobile #001",
    description: "Trilocale semicentrale, stima rendimento 6.1% annuo",
    targetEUR: FUNDING.targetEUR,
    raisedEUR: FUNDING.raisedEUR,
    backers: FUNDING.backers,
    network: "EVM Testnet",
    poolAddress: "0x1111111111111111111111111111111111111111",
    yieldEstimate: 6.1,
    deadline: "2026-01-31",
  },
};

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
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>1) Connetti MetaMask</CardTitle>
              <CardDescription>
                Richiesto per firmare le transazioni.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mm.account ? (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Connesso come{" "}
                    <span className="font-mono">{formatAddr(mm.account)}</span>
                  </div>
                  <Badge variant="outline">Chain {mm.chainId ?? "?"}</Badge>
                </div>
              ) : (
                <Button onClick={mm.connect} className="gap-2">
                  Connetti MetaMask
                </Button>
              )}
              {!mm.isAvailable && (
                <p className="text-sm text-red-600 mt-3">
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

        <div className="space-y-6">
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
  );
}

export function PoolDetailPage() {
  const params = useParams();
  const pool = getPoolById(params.id ?? "001");
  if (!pool) return <div className="p-6">Pool non trovato</div>;

  const progress = Math.min(
    100,
    Math.round((pool.raisedEUR / pool.targetEUR) * 100)
  );

  return (
    <div className="container-fluid w-screen min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex items-start justify-between gap-4 w-full">
          <div className="flex-1">
            <Badge variant="secondary">Dettaglio pool</Badge>
            <h1 className="text-3xl font-semibold mt-2">{pool.title}</h1>
            <p className="text-slate-600">{pool.description}</p>
          </div>
          <div className="text-right text-sm text-slate-600 shrink-0">
            <div>Network</div>
            <div className="font-medium">{pool.network}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 w-full">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Stato raccolta</CardTitle>
                <CardDescription>
                  Progress, target, partecipanti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span>Avanzamento</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="grid grid-cols-3 gap-3 text-sm mt-4">
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <div className="text-slate-500">Raccolti</div>
                    <div className="font-semibold">{toEUR(pool.raisedEUR)}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <div className="text-slate-500">Obiettivo</div>
                    <div className="font-semibold">{toEUR(pool.targetEUR)}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <div className="text-slate-500">Sostenitori</div>
                    <div className="font-semibold">
                      {pool.backers.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Dati on‑chain (placeholder)</CardTitle>
                <CardDescription>
                  Indirizzi chiave e link explorer
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <span className="text-slate-500">Pool contract</span>
                  <div className="font-mono">{pool.poolAddress}</div>
                </div>
                <div>
                  <span className="text-slate-500">Token quote</span>
                  <div className="font-mono">(da definire)</div>
                </div>
                <div>
                  <span className="text-slate-500">Treasury multisig</span>
                  <div className="font-mono">(da definire)</div>
                </div>
                <Separator className="my-2" />
                <div className="text-slate-600">
                  Eventi recenti: Deposit, ThresholdReached, PurchaseExecuted,
                  RentPayout (mock)
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Documenti</CardTitle>
                <CardDescription>Due diligence & whitepaper</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  Due diligence legale (PDF) —{" "}
                  <span className="text-slate-500">coming soon</span>
                </div>
                <div>
                  Whitepaper —{" "}
                  <span className="text-slate-500">coming soon</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Partecipa</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to={`/pool/${pool.id}/join`}>
                    Partecipa alla raccolta
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
