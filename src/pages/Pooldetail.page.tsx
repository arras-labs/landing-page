import { Progress } from "@radix-ui/react-progress";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { POOLS, type Pool } from "../types/types";
import { Badge } from "../components/ui/badge";

function getPoolById(id?: string | number | null): Pool | null {
  if (!id) return null;
  const key = String(id).padStart(3, "0");
  return POOLS[key] ?? null;
}

const toEUR = (n: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

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
                <CardTitle>Highlights</CardTitle>
                <CardDescription>Metriche rapide dell'immobile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <div className="text-slate-500">Camere</div>
                    <div className="font-semibold">3</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <div className="text-slate-500">Bagni</div>
                    <div className="font-semibold">2</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <div className="text-slate-500">Superficie</div>
                    <div className="font-semibold">95 m²</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <div className="text-slate-500">Anno</div>
                    <div className="font-semibold">2015</div>
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
