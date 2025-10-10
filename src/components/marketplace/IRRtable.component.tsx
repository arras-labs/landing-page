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

export default function IrrScenariosTable({
  base,
  bull,
  bear,
}: {
  base: {
    rentGrowth: number;
    valueGrowth: number;
    irr3: number;
    irr5: number;
    irr8: number;
  };
  bull: {
    rentGrowth: number;
    valueGrowth: number;
    irr3: number;
    irr5: number;
    irr8: number;
  };
  bear: {
    rentGrowth: number;
    valueGrowth: number;
    irr3: number;
    irr5: number;
    irr8: number;
  };
}) {
  const rows = [
    { name: "Conservativo", ...bear },
    { name: "Base", ...base },
    { name: "Ottimistico", ...bull },
  ];
  const chartData = [
    {
      horizon: "3 anni",
      Conservativo: bear.irr3 * 100,
      Base: base.irr3 * 100,
      Ottimistico: bull.irr3 * 100,
    },
    {
      horizon: "5 anni",
      Conservativo: bear.irr5 * 100,
      Base: base.irr5 * 100,
      Ottimistico: bull.irr5 * 100,
    },
    {
      horizon: "8 anni",
      Conservativo: bear.irr8 * 100,
      Base: base.irr8 * 100,
      Ottimistico: bull.irr8 * 100,
    },
  ];
  const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

  return (
    <div className="space-y-4">
      <SplitHoverCard
        minHeight="h-80"
        left={
          <div className="h-full w-full overflow-x-auto p-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2">Scenario</th>
                  <th className="py-2">Crescita affitto</th>
                  <th className="py-2">Crescita valore</th>
                  <th className="py-2">IRR 3y</th>
                  <th className="py-2">IRR 5y</th>
                  <th className="py-2">IRR 8y</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className="border-t border-slate-200">
                    <td className="py-2 font-medium">{r.name}</td>
                    <td className="py-2">{pct(r.rentGrowth)}</td>
                    <td className="py-2">{pct(r.valueGrowth)}</td>
                    <td className="py-2">{pct(r.irr3)}</td>
                    <td className="py-2">{pct(r.irr5)}</td>
                    <td className="py-2">{pct(r.irr8)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-slate-500">
              IRR ipotetico pre-tasse; esclusi shock macro straordinari. Dati a
              solo scopo illustrativo.
            </p>
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
                <XAxis dataKey="horizon" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${v.toFixed(0)}%`}
                  tick={{ fontSize: 12 }}
                  width={60}
                />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                <Legend />
                <Bar
                  dataKey="Conservativo"
                  fill="#64748b"
                  radius={[4, 4, 0, 0]}
                />
                <Bar dataKey="Base" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="Ottimistico"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        }
      />
    </div>
  );
}
