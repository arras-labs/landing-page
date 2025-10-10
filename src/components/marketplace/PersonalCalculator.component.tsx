import React from "react";
import { StatBox } from "./Kpi.component";

const toEUR = (n: number, max = 0) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: max,
  }).format(n);

export default function PersonalCalculator({
  netYield,
  feeMgmt,
  exampleDefault = 1000,
}: {
  netYield: number;
  feeMgmt: number;
  exampleDefault?: number;
}) {
  const [amt, setAmt] = React.useState(exampleDefault);
  const yearly = amt * (netYield - feeMgmt);
  const monthly = yearly / 12;
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <StatBox label="Importo ipotizzato" value={toEUR(amt)} />
        <StatBox label="Payout mensile stimato" value={toEUR(monthly, 2)} />
        <StatBox label="Payout annuo stimato" value={toEUR(yearly, 2)} />
      </div>
      <div className="mt-2">
        <input
          type="range"
          min={100}
          max={20000}
          step={100}
          value={amt}
          onChange={(e) => setAmt(Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>100€</span>
          <span>20.000€</span>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Include una management fee ipotizzata dell’{Math.round(feeMgmt * 100)}%
        annuo. Non è una garanzia di rendimento.
      </p>
    </div>
  );
}
