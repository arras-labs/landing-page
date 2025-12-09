import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Building2, Coins, ShieldCheck, Wallet2 } from "lucide-react";

const HOW_IT_WORKS = [
  {
    icon: <Wallet2 className="h-6 w-6" />,
    title: "Partecipa alla raccolta",
    desc: "Contribuisci on-chain al pool dell'immobile. Trasparenza totale: depositi e quote sono registrati su blockchain.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Acquisto automatizzato",
    desc: "Raggiunta la soglia, lo smart contract invia i fondi al venditore e l'immobile viene acquisito dalla startup.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Rendite ricorrenti",
    desc: "Gli affitti netti vengono ripartiti periodicamente agli indirizzi che hanno contribuito, in proporzione alla quota.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Custodia & governance",
    desc: "Controlli multi‑sig, audit indipendenti e votazioni comunitarie su manutenzioni straordinarie e riallocazioni.",
  },
];

export default function PillarSection() {
  const numSteps = HOW_IT_WORKS.length;
  const leftX = 250;
  const rightX = 750;

  // Coordinate Y per ogni step - molto più distanziate per seguire il layout reale
  const stepPositions = [60, 320, 650, 1200];

  // Genera dinamicamente il path SVG
  const generatePath = () => {
    let path = `M ${leftX} ${stepPositions[0]}`;

    for (let i = 0; i < numSteps - 1; i++) {
      const currentY = stepPositions[i];
      const nextY = stepPositions[i + 1];
      const controlY1 = currentY + (nextY - currentY) * 0.4;
      const controlY2 = nextY - (nextY - currentY) * 0.4;

      if (i % 2 === 0) {
        // Da sinistra a destra
        path += ` C ${leftX} ${controlY1}, ${rightX} ${controlY2}, ${rightX} ${nextY}`;
      } else {
        // Da destra a sinistra
        path += ` C ${rightX} ${controlY1}, ${leftX} ${controlY2}, ${leftX} ${nextY}`;
      }
    }

    return path;
  };

  const svgHeight = stepPositions[numSteps - 1] + 200;

  return (
    <section
      id="come-funziona"
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary">Come funziona</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Dal deposito alla rendita, in 4 step
          </h2>
          <p className="mt-2 text-slate-600">
            Tutto tracciato on‑chain, con processi automatizzati e auditabili.
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Linea serpentina continua - nascosta su mobile */}
        <svg
          className="hidden md:block absolute left-0 right-0 top-0 w-full pointer-events-none"
          style={{ height: `${svgHeight}px` }}
          viewBox={`0 0 1000 ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="line-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {/* Path serpentina generato dinamicamente */}
          <motion.path
            d={generatePath()}
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 4.5, ease: "easeInOut", delay: 0.1 }}
            viewport={{ once: true }}
          />
        </svg>

        {/* Step cards */}
        {HOW_IT_WORKS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex ${
              i % 2 === 0 ? "md:justify-start" : "md:justify-end"
            } justify-center mb-12 md:mb-16 relative z-10`}
          >
            <div className="w-full md:w-[420px] relative">
              {/* Numero step */}
              <div
                className={`absolute -top-4 ${
                  i % 2 === 0 ? "md:-right-4 right-4" : "md:-left-4 left-4"
                } h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-pink-500 text-white font-bold text-xl grid place-items-center shadow-lg z-20`}
              >
                {i + 1}
              </div>

              <Card className="h-full border-slate-200 bg-white/80 backdrop-blur transition-all duration-300 hover:shadow-xl hover:border-slate-300 hover:scale-105">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.2 + 0.4, duration: 0.5 }}
                    className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-pink-500 text-white grid place-items-center mb-4 shadow-lg"
                  >
                    {s.icon}
                  </motion.div>
                  <h3 className="font-semibold text-xl mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
