import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ArrowRight,
  Coins,
  FileText,
  ShieldCheck,
  Banknote,
  Users,
  ReceiptText,
} from "lucide-react";
import { Badge } from "../ui/badge";
import React from "react";

function BarSeg({
  widthPct,
  color,
  label,
  value,
}: {
  widthPct: number;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className="group relative h-full"
      style={{ width: `${widthPct}%`, background: color }}
    >
      {/* tooltip on hover */}
      <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] text-white opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100">
        <span className="font-medium">{label}</span> · {value}
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </div>
    </div>
  );
}

function HoverRevealItem({
  icon,
  title,
  summary,
  detail,
  accent = "sky",
}: {
  icon: React.ReactNode;
  title: string;
  summary?: string;
  detail: React.ReactNode;
  accent?: "sky" | "pink" | "amber" | "emerald";
}) {
  const [hover, setHover] = React.useState(false);
  const accentBg: Record<string, string> = {
    sky: "bg-sky-500/10 text-sky-600",
    pink: "bg-pink-500/10 text-pink-600",
    amber: "bg-amber-500/10 text-amber-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        "rounded-xl border border-slate-200 transition-all duration-300 overflow-hidden",
        hover ? "bg-white shadow-md scale-[1.01]" : "bg-slate-50",
      ].join(" ")}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={`h-9 w-9 grid place-items-center rounded-lg ${accentBg[accent]}`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium">{title}</div>
          {summary ? (
            <div className="text-sm text-slate-600">{summary}</div>
          ) : null}
          <div
            className={[
              "mt-2 text-xs text-slate-700 leading-relaxed",
              "transition-[max-height,opacity] duration-300",
              hover ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
            ].join(" ")}
          >
            {detail}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TokenomicsSection() {
  return (
    <section
      id="tokenomics"
      className="bg-gradient-to-b from-white to-slate-50 border-y border-slate-200 overflow-hidden"
    >
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline">Rendite &amp; ripartizione</Badge>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Come fluiscono gli affitti
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Le locazioni vengono incassate off-chain e inviate periodicamente
            allo smart contract che ripartisce in automatico i proventi verso i
            partecipanti, in proporzione alla quota.
          </p>
        </motion.div>

        {/* GRID 2×2: tutte le card con stessa animazione */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Varianti animate riutilizzabili */}
          {/*
    Puoi spostare questi oggetti fuori dal render se preferisci.
  */}
          {(() => {
            const fadeInUp = {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              viewport: { once: true, amount: 0.3 },
            } as const;

            return (
              <>
                {/* Card 1 — Flusso dei canoni → payout (lista step a sinistra, dettaglio a destra) */}
                <motion.div {...fadeInUp}>
                  <Card className="border-slate-200 overflow-hidden h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <ReceiptText className="h-5 w-5 text-sky-500" />
                        Flusso dei canoni → payout on-chain
                      </CardTitle>
                      <CardDescription>
                        Dal conduttore agli investitori
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-6">
                      {(() => {
                        const steps = [
                          {
                            key: "tenant",
                            label: "Conduttore",
                            icon: <Users className="h-5 w-5" />,
                            summary: "Paga l’affitto (off-chain)",
                            detail: (
                              <>
                                L’affitto viene pagato sul conto della società
                                veicolo/startup. Ricevute archiviate off-chain
                                con hash pubblico.
                              </>
                            ),
                          },
                          {
                            key: "filter",
                            label: "Raccolta & filtro",
                            icon: <Banknote className="h-5 w-5" />,
                            summary: "Spese ricorrenti + fondo",
                            detail: (
                              <>
                                Dal lordo si sottraggono spese ricorrenti e una
                                quota per il <strong>fondo manutenzione</strong>
                                .
                              </>
                            ),
                          },
                          {
                            key: "toSC",
                            label: "Trasferimento a SC",
                            icon: <ReceiptText className="h-5 w-5" />,
                            summary: "Netto → smart contract",
                            detail: (
                              <>
                                Il <em>netto</em> periodico è inviato allo smart
                                contract del pool. Transazione pubblica e
                                riconciliabile.
                              </>
                            ),
                          },
                          {
                            key: "split",
                            label: "Ripartizione",
                            icon: <Coins className="h-5 w-5" />,
                            summary: "Distribuzione pro-quota",
                            detail: (
                              <>
                                Lo smart contract calcola le quote e
                                distribuisce agli indirizzi dei partecipanti.
                                Eventuali resti si accantonano.
                              </>
                            ),
                          },
                        ] as const;

                        const [active, setActive] =
                          React.useState<(typeof steps)[number]["key"]>(
                            "tenant"
                          );
                        const current = steps.find((s) => s.key === active)!;

                        return (
                          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
                            {/* Steps (sinistra) */}
                            <div className="lg:col-span-2 space-y-3">
                              {steps.map((s) => (
                                <div
                                  key={s.key}
                                  className="flex items-center gap-3"
                                >
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActive(s.key)}
                                    onFocus={() => setActive(s.key)}
                                    className={[
                                      "flex-1 text-left rounded-xl border px-3 py-2 transition-all",
                                      s.key === current.key
                                        ? "border-slate-300 bg-white shadow-sm"
                                        : "border-slate-200 bg-slate-50 hover:bg-white",
                                    ].join(" ")}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="h-8 w-8 grid place-items-center rounded-lg bg-sky-500/10 text-sky-600">
                                        {s.icon}
                                      </span>
                                      <div>
                                        <div className="text-sm font-medium">
                                          {s.label}
                                        </div>
                                        <div className="text-xs text-slate-600">
                                          {s.summary}
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              ))}
                            </div>

                            {/* Divisore tratteggiato verticale (tra sinistra e destra) */}
                            <div className="hidden lg:flex lg:col-span-1 items-stretch justify-center">
                              <div className="w-px h-full border-l-2 border-dashed border-slate-300" />
                            </div>

                            {/* Pannello dettagli (destra) — centrato verticalmente e più compatto */}
                            <div className="lg:col-span-2 place-self-center">
                              <div className="inline-flex max-w-prose rounded-xl border border-slate-200 bg-white p-4">
                                <div className="flex items-start gap-3">
                                  <div className="h-10 w-10 grid place-items-center rounded-lg bg-sky-500/10 text-sky-600">
                                    {current.icon}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-semibold">
                                      {current.label}
                                    </div>
                                    <div className="mt-1 text-sm text-slate-700 leading-relaxed">
                                      {current.detail}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Card 2 — Esempio di ripartizione (con breakdown barra) */}
                <motion.div {...fadeInUp}>
                  <Card className="border-slate-200 overflow-hidden h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Coins className="h-5 w-5 text-amber-500" />
                        Esempio di ripartizione
                      </CardTitle>
                      <CardDescription>
                        Immobiliare #001 (stima)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-xs text-slate-600">
                        Breakdown mensile (lordo → netto)
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <div className="relative flex h-7 w-full overflow-visible rounded-md">
                          {/* lordo 1250: vacancy 62.5, spese 250, fee 12.5, netto 925 */}
                          <BarSeg
                            widthPct={(62.5 / 1250) * 100}
                            color="#fca5a5"
                            label="Vacancy ~5%"
                            value="€62"
                          />
                          <BarSeg
                            widthPct={(250 / 1250) * 100}
                            color="#fde68a"
                            label="Spese + fondo"
                            value="€250"
                          />
                          <BarSeg
                            widthPct={(12.5 / 1250) * 100}
                            color="#c7d2fe"
                            label="Mgmt fee ~1%"
                            value="€12"
                          />
                          <BarSeg
                            widthPct={(925 / 1250) * 100}
                            color="#86efac"
                            label="Netto a distribuire"
                            value="€925"
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                          <span>
                            Passa il mouse sui segmenti per i dettagli
                          </span>
                          <span>Totale lordo: € 1.250</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                          {
                            label: "Affitto mensile (lordo)",
                            value: "€ 1.250",
                          },
                          { label: "Spese & fondo", value: "€ 250" },
                          { label: "Vacancy stimata", value: "€ ~62" },
                          { label: "Mgmt fee (1%)", value: "€ ~12" },
                          { label: "Netto a distribuire", value: "€ ~925" },
                          { label: "Frequenza", value: "Mensile" },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="p-3 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm"
                          >
                            <div className="text-xs text-slate-500">
                              {item.label}
                            </div>
                            <div className="text-base font-semibold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
                              {item.value}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Card 3 — Garanzie & governance (hover-reveal) */}
                <motion.div {...fadeInUp}>
                  <Card className="border-slate-200 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <ShieldCheck className="h-5 w-5 text-pink-500" />
                        Garanzie &amp; governance
                      </CardTitle>
                      <CardDescription>
                        Protezione capitale e voto
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <HoverRevealItem
                          icon={<ShieldCheck className="h-4 w-4" />}
                          title="Multi-sig per operazioni critiche"
                          summary="N-di-M firmatari per movimenti sensibili"
                          detail={
                            <>
                              Trasferimenti e upgrade richiedono più firme
                              autorizzate: riduce rischi operativi.
                            </>
                          }
                          accent="pink"
                        />
                        <HoverRevealItem
                          icon={<ShieldCheck className="h-4 w-4" />}
                          title="Oracoli per trigger di payout"
                          summary="Automazione del versamento netto"
                          detail={
                            <>
                              Job periodico invoca il payout sullo smart
                              contract; mismatch → riconciliazione.
                            </>
                          }
                          accent="emerald"
                        />
                        <HoverRevealItem
                          icon={<ShieldCheck className="h-4 w-4" />}
                          title="Votazioni straordinarie"
                          summary="Governance per spese extra o policy"
                          detail={
                            <>
                              Quorum e maggioranze definite nel whitepaper. I
                              partecipanti deliberano gli interventi.
                            </>
                          }
                          accent="amber"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Card 4 — Principi di ripartizione (le “pill” che chiedevi dove mettere) */}
                <motion.div {...fadeInUp}>
                  <Card className="border-slate-200 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <ArrowRight className="h-5 w-5 text-sky-500" />
                        Principi di ripartizione
                      </CardTitle>
                      <CardDescription>
                        Quote, fondi e trasparenza
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <HoverRevealItem
                          icon={<ArrowRight className="h-5 w-5" />}
                          title="Quote proporzionali"
                          summary="Distribuzione basata sull’importo investito"
                          detail={
                            <>
                              Se versi il 2% della raccolta, riceverai ~2% dei
                              proventi netti a ogni payout.
                            </>
                          }
                          accent="sky"
                        />
                        <HoverRevealItem
                          icon={<ShieldCheck className="h-5 w-5" />}
                          title="Fondo manutenzione"
                          summary="Riserva per spese straordinarie"
                          detail={
                            <>
                              Piccola % accantonata per guasti non ricorrenti
                              (caldaia, tetto, ecc.).
                            </>
                          }
                          accent="pink"
                        />
                        <HoverRevealItem
                          icon={<FileText className="h-5 w-5" />}
                          title="Reportistica pubblica"
                          summary="Dati verificabili on-chain"
                          detail={
                            <>
                              Transazioni, saldi e hash dei documenti sono
                              consultabili da chiunque.
                            </>
                          }
                          accent="amber"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
