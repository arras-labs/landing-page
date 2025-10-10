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

      <div className="relative max-w-5xl mx-auto">
        {HOW_IT_WORKS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex ${
              i % 2 === 0 ? "justify-end" : "justify-start"
            } mb-6`}
            style={{
              marginTop: i > 0 ? "-2rem" : "0", // Sovrappone leggermente le card
            }}
          >
            <div
              className={`w-full md:w-[450px] relative ${
                i % 2 === 0 ? "mr-auto md:mr-8" : "ml-auto md:ml-8"
              }`}
            >
              <Card className="h-full border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-slate-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.2 + 0.4, duration: 0.5 }}
                    className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-pink-500 text-white grid place-items-center mb-4 shadow-lg"
                  >
                    {s.icon}
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
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
