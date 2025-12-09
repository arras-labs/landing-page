import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Property } from "../../types-marketplace";

interface YieldSectionProps {
  property: Property;
  userTokens?: number;
}

export const YieldSection = ({
  property,
  userTokens = 0,
}: YieldSectionProps) => {
  const estimatedYield = Number(property.estimatedAnnualYield) / 100; // Converti da centesimi a percentuale
  const totalValueUSD = Number(property.totalValueUSD);
  const tokenPrice = 50;
  const userInvestment = userTokens * tokenPrice;

  // Proiezione rendimento a 5 anni
  const projectionData = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    const annualReturn = userInvestment * (estimatedYield / 100);
    const cumulativeReturn = annualReturn * year;
    return {
      year: `Anno ${year}`,
      rendimento: parseFloat(annualReturn.toFixed(2)),
      cumulativo: parseFloat(cumulativeReturn.toFixed(2)),
    };
  });

  // Distribuzione investimento
  const distributionData = [
    { name: "Tuo Investimento", value: userInvestment },
    { name: "Altri Investitori", value: totalValueUSD - userInvestment },
  ];

  // Metriche mensili simulate
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    mese: [
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
    ][i],
    rendimento: parseFloat(
      ((userInvestment * (estimatedYield / 100)) / 12).toFixed(2)
    ),
  }));

  const COLORS = ["#3B82F6", "#E5E7EB"];

  return (
    <div className="space-y-8">
      {/* Statistiche principali */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div className="text-sm font-semibold opacity-90">
              Rendimento Annuale
            </div>
          </div>
          <div className="text-4xl font-bold">{estimatedYield}%</div>
          <div className="text-xs opacity-75 mt-2">Stima conservativa</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className="text-sm font-semibold opacity-90">Tuo Investimento</div>
          </div>
          <div className="text-4xl font-bold">
            ${userInvestment.toLocaleString()}
          </div>
          <div className="text-xs opacity-75 mt-2">{userTokens} token</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <div className="text-sm font-semibold opacity-90">
              Rendimento Annuale
            </div>
          </div>
          <div className="text-4xl font-bold">
            ${((userInvestment * estimatedYield) / 100).toFixed(0)}
          </div>
          <div className="text-xs opacity-75 mt-2">Payout stimato/anno</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-sm font-semibold opacity-90">
              Rendimento Mensile
            </div>
          </div>
          <div className="text-4xl font-bold">
            ${((userInvestment * estimatedYield) / 100 / 12).toFixed(0)}
          </div>
          <div className="text-xs opacity-75 mt-2">Payout stimato/mese</div>
        </div>
      </div>

      {/* Grafici */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proiezione a 5 anni */}
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Proiezione Rendimento 5 Anni
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="rendimento"
                stroke="#f59e0b"
                strokeWidth={3}
                name="Rendimento Annuale"
                dot={{ fill: '#f59e0b', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="cumulativo"
                stroke="#ec4899"
                strokeWidth={3}
                name="Rendimento Cumulativo"
                dot={{ fill: '#ec4899', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuzione investimento */}
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-lg p-6 border border-pink-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            Distribuzione Pool
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Rendimento mensile */}
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-lg p-6 lg:col-span-2 border border-purple-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Rendimento Mensile Stimato
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mese" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Bar
                dataKey="rendimento"
                fill="url(#colorGradient)"
                name="Rendimento Mensile"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Note informative */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-xl shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Nota:</strong> I rendimenti mostrati sono stime basate su
              dati storici e proiezioni. I rendimenti effettivi possono variare
              in base alle condizioni di mercato, occupazione e spese di
              gestione. Gli investimenti immobiliari comportano rischi e non
              garantiscono profitti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
