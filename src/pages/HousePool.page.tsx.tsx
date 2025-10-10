import React from "react";
import { useParams } from "react-router-dom";
import { House, MapPin, ShieldCheck, Wallet2 } from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useMetaMask } from "../hooks/meta.hook";
import { ContributionForm } from "../components/landing/ContributionForm.component";
import {
  center,
  comps,
  pois,
  POOLS,
  property,
  type Pool,
} from "../types/types";
import { PropertyMap } from "../components/marketplace/PropertyMap.component";
import GalleryStrip from "../components/marketplace/GalleryStrip.component";
import CollapsibleCard from "../components/marketplace/CollapsibleCard.component";
import { Kpi, Pill, StatBox } from "../components/marketplace/Kpi.component";
import MarketplaceHeader from "../components/marketplace/Header.component";
import CountdownBanner from "../components/marketplace/CountdownBanner.component";
import DataRoom from "../components/marketplace/DataRoom.component";
import OnchainGovernanceSection from "../components/marketplace/Governance.component";
import PersonalCalculator from "../components/marketplace/PersonalCalculator.component";
import IrrScenariosTable from "../components/marketplace/IRRtable.component";
import CashflowTable from "../components/marketplace/Cashflow.component";

function getPoolById(id?: string | number | null): Pool | null {
  if (!id) return null;
  const key = String(id).padStart(3, "0");
  return POOLS[key] ?? null;
}
const toEUR = (n: number, max = 0) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: max,
  }).format(n);

function formatAddr(addr?: string) {
  if (!addr) return "-";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function HousePool() {
  const params = useParams();
  const pool = getPoolById(params.id ?? "001");
  const mm = useMetaMask();

  if (!pool) return <div className="p-6">Pool non trovato</div>;

  React.useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollbarGutter;
    root.style.scrollbarGutter = "stable";
    return () => {
      root.style.scrollbarGutter = prev;
    };
  }, []);

  const totalCapex =
    property.purchasePrice +
    property.taxesNotary +
    property.refurbish +
    property.furnishing +
    property.originationFee +
    property.reserveFund;

  const progress = Math.min(
    100,
    Math.round((pool.raisedEUR / pool.targetEUR) * 100)
  );

  const propertyForMap = {
    title: pool.title,
    address: "Via delle Magnolie 18, Bologna",
    lat: center[0],
    lng: center[1],
    rentExpected: 1250,
    netYield: 5.4,
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <MarketplaceHeader />

      {/* HERO: Gallery + Ribbon sovrapposto */}
      <section className="relative">
        <GalleryStrip images={property.images} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 sm:-mt-24 lg:-mt-28">
            <div className="w-full md:w-[600px] lg:w-[620px] ml-auto rounded-2xl bg-white/90 backdrop-blur border border-slate-200 shadow-xl p-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Pool #{pool.id}</Badge>
                  <Badge variant="outline">{pool.network}</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
                  <House className="h-5 w-5" /> {pool.title}
                </h1>
                <p className="text-slate-600">{pool.description}</p>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{property.address}</span>
                  <span className="text-slate-500">· {property.city}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Kpi
                    label="Avanzamento"
                    value={`${progress}%`}
                    progress={progress}
                  />
                  <Kpi label="Raccolti" value={toEUR(pool.raisedEUR)} />
                  <Kpi label="Obiettivo" value={toEUR(pool.targetEUR)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONI */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-8">
            {/* Countdown raccolta */}
            <CountdownBanner targetISO="2026-01-31T23:59:59Z" />

            {/* Dettagli immobile */}
            <CollapsibleCard
              id="specifiche"
              title="Dettagli dell’immobile & stato locativo"
              desc="Caratteristiche tecniche, piano, condizioni e informazioni sull’inquilino"
              anchor
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <Pill label="Camere" value={property.beds} />
                <Pill label="Bagni" value={property.baths} />
                <Pill label="Superficie" value={`${property.area} m²`} />
                <Pill label="Anno" value={property.year} />
                <Pill label="Piano" value={property.floor} />
                <Pill label="Condizione" value={property.condition} />
                <Pill
                  label="Stato locazione"
                  value={property.rentStatus}
                  className="col-span-2"
                />
              </div>
            </CollapsibleCard>

            {/* Breakdown finanziario */}
            <CollapsibleCard
              id="financials"
              title="Breakdown dei costi d’acquisto"
              desc="Prezzo, imposte/notaio, lavori, arredamento, fee e fondi"
              anchor
            >
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <StatBox
                  label="Prezzo immobile"
                  value={toEUR(property.purchasePrice)}
                />
                <StatBox
                  label="Imposte & notaio"
                  value={toEUR(property.taxesNotary)}
                />
                <StatBox
                  label="Ristrutturazione"
                  value={toEUR(property.refurbish)}
                />
                <StatBox label="Arredo" value={toEUR(property.furnishing)} />
                <StatBox
                  label="Originazione (1.5%)"
                  value={toEUR(property.originationFee)}
                />
                <StatBox
                  label="Fondo manutenzione"
                  value={toEUR(property.reserveFund)}
                />
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm flex items-center justify-between">
                <span className="text-slate-600">Capex totale stimato</span>
                <span className="font-semibold">{toEUR(totalCapex)}</span>
              </div>
            </CollapsibleCard>

            {/* Proiezioni rendite & flussi mensili */}
            <CollapsibleCard
              id="rendite"
              title="Proiezione rendite e flussi mensili (12 mesi)"
              desc="Affitto atteso, vacancy, spese e payout netto"
              anchor
            >
              <CashflowTable
                monthlyRent={property.monthlyRent}
                condoFees={property.condoFees}
                vacancyRate={0.05}
                maintenancePct={0.03}
                mgmtPct={0.02}
              />
            </CollapsibleCard>

            {/* Scenari & IRR */}
            <CollapsibleCard
              id="scenari"
              title="Scenari e IRR (3/5/8 anni)"
              desc="Ipotesi base, ottimistica e conservativa su affitti e valorizzazione"
              anchor
            >
              <IrrScenariosTable
                base={{
                  rentGrowth: 0.02,
                  valueGrowth: 0.02,
                  irr3: 0.082,
                  irr5: 0.095,
                  irr8: 0.105,
                }}
                bull={{
                  rentGrowth: 0.03,
                  valueGrowth: 0.035,
                  irr3: 0.11,
                  irr5: 0.125,
                  irr8: 0.138,
                }}
                bear={{
                  rentGrowth: 0.0,
                  valueGrowth: -0.01,
                  irr3: 0.045,
                  irr5: 0.058,
                  irr8: 0.068,
                }}
              />
            </CollapsibleCard>

            {/* Calcolatore personale */}
            <CollapsibleCard
              id="calcolatore"
              title="Calcolatore personale di payout"
              desc="Seleziona il tuo importo per stimare il payout mensile e annuo"
              anchor
            >
              <PersonalCalculator
                netYield={property.netYield / 100}
                feeMgmt={0.01}
                exampleDefault={1000}
              />
            </CollapsibleCard>

            {/* On-chain esteso & Governance */}
            <CollapsibleCard
              id="onchain"
              title="On-chain, tokenomics delle quote & governance"
              desc="Contratti, diritti economici, automazioni di payout e voto"
              anchor
            >
              <OnchainGovernanceSection pool={pool} />
            </CollapsibleCard>

            {/* Data room & mappa */}
            <CollapsibleCard
              id="dataroom"
              title="Documenti & data room"
              desc="Perizie, contratti, polizze, APE, verbali"
              anchor
            >
              <DataRoom />
            </CollapsibleCard>

            <CollapsibleCard
              id="mappa"
              title="Mappa & contesto di quartiere"
              desc="Servizi, trasporti, canoni medi della zona (placeholder)"
              anchor
            >
              <PropertyMap
                center={center}
                property={propertyForMap}
                pois={pois}
                comps={comps}
              />
            </CollapsibleCard>

            {/* Partecipa: wallet + form + note processo (ripetiamo anchor) */}
            <CollapsibleCard
              id="join"
              title="Partecipa e versa al pool"
              desc="Connetti il wallet e contribuisci in pochi passaggi"
              anchor
            >
              <div className="space-y-6">
                <Card className="relative overflow-hidden border-slate-200">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500" />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center">
                          <Wallet2 className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            Connetti MetaMask
                          </CardTitle>
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
                          <Badge variant="outline">
                            Chain {mm.chainId ?? "?"}
                          </Badge>
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
                            <ShieldCheck className="h-4 w-4 mt-0.5" /> Firma
                            sicura e non‑custodial
                          </li>
                          <li className="flex gap-2">
                            <ShieldCheck className="h-4 w-4 mt-0.5" /> Indirizzo
                            e stato visibili
                          </li>
                        </ul>
                      </>
                    )}
                    {!mm.isAvailable && (
                      <p className="text-sm text-red-600">
                        MetaMask non rilevato. Installa l’estensione e ricarica
                        la pagina.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <ContributionForm pool={pool} />

                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle>Come funziona il versamento</CardTitle>
                    <CardDescription>
                      Deposito → Escrow → Acquisto → Payout
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600 space-y-2">
                    <p>
                      I depositi vengono registrati on-chain. Raggiunta la
                      soglia, il contratto esegue l’acquisto e le future rendite
                      saranno distribuite proporzionalmente.
                    </p>
                    <p>
                      Se la soglia non viene raggiunta entro la deadline, i
                      fondi restano prelevabili secondo la policy del pool.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CollapsibleCard>
          </div>
        </div>
      </section>
    </div>
  );
}
