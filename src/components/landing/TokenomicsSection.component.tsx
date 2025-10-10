import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, Coins, FileText, ShieldCheck } from "lucide-react";
import { Badge } from "../ui/badge";

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
          <Badge variant="outline">Rendite & ripartizione</Badge>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Come fluiscono gli affitti
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Le locazioni vengono incassate off‑chain e distribuite
            automaticamente attraverso smart contract ai partecipanti.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4 relative"
          >
            <div className="sticky top-24 space-y-8">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/20 to-pink-500/20 blur-xl" />
                <Card className="relative border-slate-200">
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {[
                        {
                          icon: <ArrowRight className="h-5 w-5" />,
                          title: "Quote proporzionali",
                          desc: "Distribuzione basata sull'importo investito",
                        },
                        {
                          icon: <ShieldCheck className="h-5 w-5" />,
                          title: "Fondo manutenzione",
                          desc: "Riserva per spese straordinarie",
                        },
                        {
                          icon: <FileText className="h-5 w-5" />,
                          title: "Reportistica pubblica",
                          desc: "Dati verificabili on-chain",
                        },
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-pink-500 text-white grid place-items-center shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-slate-600">
                              {item.desc}
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-slate-200 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Coins className="h-5 w-5 text-amber-500" />
                    Esempio di ripartizione
                  </CardTitle>
                  <CardDescription>Immobiliare #001 (stima)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Affitto mensile", value: "€ 1.250" },
                      { label: "Spese & fondo", value: "€ 250" },
                      { label: "Netto a distribuire", value: "€ 1.000" },
                      { label: "Frequenza", value: "Mensile" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm"
                      >
                        <div className="text-sm text-slate-500">
                          {item.label}
                        </div>
                        <div className="text-lg font-semibold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ShieldCheck className="h-5 w-5 text-pink-500" />
                    Garanzie & governance
                  </CardTitle>
                  <CardDescription>Protezione capitale e voto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Multi‑sig per operazioni critiche",
                      "Oracoli per trigger di payout",
                      "Votazioni su interventi straordinari",
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm flex items-center gap-3"
                      >
                        <div className="h-8 w-8 rounded-lg bg-pink-500/10 text-pink-500 grid place-items-center">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-medium">{item}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
