import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import SplitHoverCard from "./Splithover.component";

export default function CashflowTable({
  monthlyRent,
  condoFees,
  vacancyRate,
  maintenancePct,
  mgmtPct,
}: {
  monthlyRent: number;
  condoFees: number;
  vacancyRate: number;
  maintenancePct: number;
  mgmtPct: number;
}) {
  const [monthsRange, setMonthsRange] = React.useState<12 | 24 | 36>(12);

  const eur = (v: number) =>
    new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);

  const monthLabels = [
    "Gen",
    "Feb",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug",
    "Ago",
    "Set",
    "Ott",
    "Nov",
    "Dic",
  ];
  const labelFor = (idx: number, start = new Date()) => {
    const d = new Date(start);
    d.setMonth(d.getMonth() + idx);
    const m = monthLabels[d.getMonth()];
    const yy = String(d.getFullYear()).slice(-2);
    return monthsRange > 12 ? `${m} '${yy}` : m;
  };

  // fino a 36 mesi
  const maxHorizon = 36;
  const allRows = Array.from({ length: maxHorizon }, (_, i) => {
    const rent = monthlyRent * (1 + (i % 6 === 0 ? 0.01 : 0));
    const vacancy = rent * vacancyRate;
    const maintenance = rent * maintenancePct;
    const mgmt = rent * mgmtPct;
    const netto = rent - vacancy - condoFees - maintenance - mgmt;
    return {
      i,
      m: labelFor(i),
      rent,
      vacancy,
      condoFees,
      maintenance,
      mgmt,
      netto,
    };
  });

  const rows = allRows.slice(0, monthsRange);

  // cumulato netto
  let running = 0;
  const chartData = rows.map((r) => {
    running += r.netto;
    return { ...r, cumNet: running };
  });

  const totalNet = rows.reduce((s, r) => s + r.netto, 0);

  return (
    <div className="space-y-4">
      {/* CONTROLLI RANGE */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Orizzonte: <span className="font-medium">{monthsRange} mesi</span>
        </div>
        <div className="flex items-center gap-1">
          {([12, 24, 36] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setMonthsRange(n)}
              className={`rounded-full px-3 py-1.5 text-sm border transition
                ${
                  monthsRange === n
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
            >
              {n}m
            </button>
          ))}
        </div>
      </div>

      {/* SPLIT: tabella sinistra / grafico destra, con espansione on hover */}
      <SplitHoverCard
        minHeight="h-80"
        left={
          <div className="h-full w-full overflow-x-auto p-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2">Mese</th>
                  <th className="py-2">Affitto</th>
                  <th className="py-2">Vacancy</th>
                  <th className="py-2">Spese cond.</th>
                  <th className="py-2">Manutenz.</th>
                  <th className="py-2">Gestione</th>
                  <th className="py-2">Netto</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.i} className="border-t border-slate-200">
                    <td className="py-2">{r.m}</td>
                    <td className="py-2">{eur(r.rent)}</td>
                    <td className="py-2 text-slate-600">-{eur(r.vacancy)}</td>
                    <td className="py-2 text-slate-600">-{eur(r.condoFees)}</td>
                    <td className="py-2 text-slate-600">
                      -{eur(r.maintenance)}
                    </td>
                    <td className="py-2 text-slate-600">-{eur(r.mgmt)}</td>
                    <td className="py-2 font-semibold">{eur(r.netto)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-300">
                  <td className="py-2 font-medium">Totale {monthsRange}m</td>
                  <td colSpan={5}></td>
                  <td className="py-2 font-bold">{eur(totalNet)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
        right={
          <div className="h-full w-full p-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="m" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => eur(v as number)}
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip
                  formatter={(v: number) => eur(v)}
                  labelFormatter={(l) => `Mese: ${l}`}
                />
                <Legend />
                <Bar
                  name="Netto cumulato"
                  dataKey="cumNet"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        }
      />

      <p className="text-xs text-slate-500">
        Istogramma mostra il <strong>netto cumulato</strong> mese su mese. Le
        stime sono illustrative con vacancy {Math.round(vacancyRate * 100)}%,
        manutenzione {Math.round(maintenancePct * 100)}% e gestione{" "}
        {Math.round(mgmtPct * 100)}% dell’affitto.
      </p>
    </div>
  );
}
