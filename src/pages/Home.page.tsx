import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Wallet2,
  Banknote,
  Users,
  ShieldCheck,
  FileText,
  Rocket,
  Calendar,
  Coins,
  LineChart,
  House,
  Mail,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Link } from "react-router-dom";
import { ImageCarousel } from "../components/ImageCarousel.component";
import React from "react";
import RoadmapSection from "../components/Roadmap.component";
import {
  BRAND,
  fadeUp,
  FAQ,
  FUNDING,
  HOUSE_IMAGES,
  ROADMAP,
} from "../types/types";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  MobileMenuButton,
  MobileMenuPanel,
} from "../components/MobileMenu.component";

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

// Utility per formattare EUR
const toEUR = (n: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export default function Home() {
  const progress = Math.min(
    100,
    Math.round((FUNDING.raisedEUR / FUNDING.targetEUR) * 100)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* NAVBAR */}
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="h-16 flex items-center justify-between gap-3">
            {/* LEFT: Brand */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 opacity-30 blur transition-opacity duration-200" />
                <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-black text-white shadow-lg">
                  <House className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="truncate text-lg font-bold tracking-tight">
                  {BRAND.name}
                </span>
                <Badge variant="secondary" className="shrink-0">
                  alpha
                </Badge>
              </div>
            </div>

            {/* CENTER: Nav (desktop) — pill container */}
            <div className="hidden md:flex items-center justify-center">
              <div className="rounded-full border border-slate-200 bg-white/70 backdrop-blur px-2 py-1 shadow-sm">
                <nav className="flex items-center">
                  {[
                    { href: "#come-funziona", label: "Come funziona" },
                    { href: "#roadmap", label: "Roadmap" },
                    { href: "#tokenomics", label: "Rendite" },
                    { href: "#faq", label: "FAQ" },
                  ].map((item, i, arr) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="relative mx-1 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100/80 hover:text-slate-900"
                    >
                      <span className="relative z-10">{item.label}</span>
                      {/* underline accent on hover */}
                      <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-amber-500 to-pink-500 transition-transform duration-200 group-hover:scale-x-100" />
                      {/* subtle divider between pills */}
                      {i < arr.length - 1 && (
                        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-5 w-px bg-slate-200/70" />
                      )}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* RIGHT: CTAs (desktop) */}
            <div className="hidden sm:flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="font-medium hover:bg-slate-100"
              >
                {BRAND.ctaSecondary}
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md transition-opacity duration-200 hover:opacity-90"
              >
                {BRAND.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <MobileMenuButton />
          </div>

          {/* Mobile panel */}
          <MobileMenuPanel />
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <Badge className="mb-4 w-fit" variant="outline">
                <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                Built on blockchain
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
                {BRAND.tagline}
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-xl">
                Mettiamo insieme il capitale per acquistare case in affitto.
                Quando la soglia è raggiunta, lo smart contract completa
                l’acquisto e le rendite vengono distribuite automaticamente ai
                partecipanti.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 min-w-[260px]">
                  <Input
                    placeholder={BRAND.emailCapturePlaceholder}
                    type="email"
                    className="h-11"
                  />
                </div>
                <Button className="h-11 px-6 gap-2" variant="outline">
                  <Mail className="h-4 w-4" /> {BRAND.ctaPrimary}
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />{" "}
                  {FUNDING.backers.toLocaleString()} sostenitori
                </div>
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" /> Target{" "}
                  {toEUR(FUNDING.targetEUR)}
                </div>
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" /> Raccolti{" "}
                  {toEUR(FUNDING.raisedEUR)}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="lg:pl-8">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Pool Immobile #001
                  </CardTitle>
                  <CardDescription>
                    Trilocale in zona semicentrale, reddito stimato 6.1% annuo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <ImageCarousel images={HOUSE_IMAGES} />
                  </div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span>Avanzamento raccolta</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                      <div className="text-slate-500">Raccolti</div>
                      <div className="font-semibold">
                        {toEUR(FUNDING.raisedEUR)}
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                      <div className="text-slate-500">Obiettivo</div>
                      <div className="font-semibold">
                        {toEUR(FUNDING.targetEUR)}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" asChild>
                    <Link to="/pool/001/join">Partecipa alla raccolta</Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/pool/001">Apri il pool su chain</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 -bottom-20 h-40 bg-gradient-to-b from-transparent to-slate-100" />
      </section>

      {/* TRUST / PILLARS */}
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

      {/* TOKENOMICS / REVENUE */}
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
                    <CardDescription>
                      Protezione capitale e voto
                    </CardDescription>
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

      <RoadmapSection ROADMAP={ROADMAP} activeIndex={0} />

      {/* SOCIAL PROOF / CARDS — con titolo “asimettrico” */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          {/* Header compatto con targhetta animata */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                I nostri{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text text-transparent">
                  pilastri
                </span>
              </h2>
              <motion.span
                initial={{ opacity: 0, x: -8, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.45,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: 0.1,
                }}
                className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                />
                in evidenza
              </motion.span>
            </div>
            <p className="mt-2 text-slate-600 max-w-2xl md:max-w-3xl">
              Tre motivi semplici ma sostanziali per cui il modello funziona
              davvero.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="group relative h-[260px] rounded-2xl overflow-hidden border border-slate-200 bg-white/70 backdrop-blur transition-shadow hover:shadow-xl">
              {/* Lottie layer (default) */}
              <div className="absolute inset-0 grid place-items-center transition-opacity duration-300 group-hover:opacity-0">
                <DotLottieReact
                  src="https://lottie.host/0cf26eed-2807-4038-88fc-4abde9eecafe/3Zh24RxtHI.lottie"
                  loop
                  autoplay
                />
              </div>

              {/* Card content (on hover) */}
              <div className="absolute inset-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />
                <div className="p-5 h-[calc(100%-4px)] flex flex-col">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-slate-900" />
                    <h3 className="text-base font-semibold">
                      Trasparenza by-design
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Tutto verificabile
                  </p>
                  <p className="text-sm text-slate-600 mt-4">
                    Dati di raccolta, quote e rendite sono pubblici e
                    consultabili. Ogni operazione è tracciata on-chain.
                  </p>
                  <div className="mt-auto pt-4">
                    <div className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <span>On-chain logs</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>Explorer-ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative h-[260px] rounded-2xl overflow-hidden border border-slate-200 bg-white/70 backdrop-blur transition-shadow hover:shadow-xl">
              {/* Lottie layer (default) */}
              <div className="absolute inset-0 grid place-items-center transition-opacity duration-300 group-hover:opacity-0">
                <DotLottieReact
                  src="https://lottie.host/6cc02845-8f2b-43b4-b1a4-e7c5931679e3/IOF8wWG6pz.lottie"
                  loop
                  autoplay
                />
              </div>

              {/* Card content (on hover) */}
              <div className="absolute inset-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="h-1 w-full bg-gradient-to-r from-indigo-400 via-violet-500 to-fuchsia-500" />
                <div className="p-5 h-[calc(100%-4px)] flex flex-col">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-900" />
                    <h3 className="text-base font-semibold">Community-first</h3>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Costruiamo con voi
                  </p>
                  <p className="text-sm text-slate-600 mt-4">
                    Coinvolgiamo i sostenitori nelle scelte chiave via
                    governance. Il modello evolve con il feedback reale.
                  </p>
                  <div className="mt-auto pt-4">
                    <div className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <span>Proposte & voto</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>Forum</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative h-[260px] rounded-2xl overflow-hidden border border-slate-200 bg-white/70 backdrop-blur transition-shadow hover:shadow-xl">
              {/* Lottie layer (default) */}
              <div className="absolute inset-0 grid place-items-center transition-opacity duration-300 group-hover:opacity-0">
                <DotLottieReact
                  src="https://lottie.host/66b9b512-9e13-46fc-8cbe-4fc4c404393f/s1zY9S51ot.lottie"
                  loop
                  autoplay
                />
              </div>

              {/* Card content (on hover) */}
              <div className="absolute inset-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500" />
                <div className="p-5 h-[calc(100%-4px)] flex flex-col">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-900" />
                    <h3 className="text-base font-semibold">Whitepaper</h3>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Specifiche tecniche
                  </p>
                  <p className="text-sm text-slate-600 mt-4">
                    Architettura smart contract, flussi di cassa, risk
                    framework, compliance UE. Disponibile a breve per i primi
                    iscritti.
                  </p>
                  <div className="mt-auto pt-4">
                    <div className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <span>Preview</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>Rilasci</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-10">
          <Badge variant="secondary">FAQ</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Domande frequenti
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CALL TO ACTION FINALE */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm relative">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-semibold">
                  Pronti a costruire il primo portafoglio immobiliare della
                  community?
                </h3>
                <p className="mt-2 text-slate-600">
                  Unisciti alla waitlist per ricevere accesso anticipato al
                  whitepaper e al primo pool.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
                  <Input
                    placeholder={BRAND.emailCapturePlaceholder}
                    type="email"
                    className="h-11"
                  />
                  <Button className="h-11 px-6" variant="outline">
                    {BRAND.ctaPrimary}
                  </Button>
                </div>
              </div>
              <div>
                <div className="rounded-2xl bg-slate-900 text-white p-6">
                  <div className="text-sm text-slate-300">
                    Stato raccolta pilota
                  </div>
                  <div className="text-3xl font-semibold mt-1">{progress}%</div>
                  <Progress value={progress} className="h-2 mt-4 bg-white/20" />
                  <div className="mt-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Raccolti</span>
                      <span className="font-medium">
                        {toEUR(FUNDING.raisedEUR)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Obiettivo</span>
                      <span className="font-medium">
                        {toEUR(FUNDING.targetEUR)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sostenitori</span>
                      <span className="font-medium">
                        {FUNDING.backers.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-100 blur-3xl opacity-60" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center">
                <House className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{BRAND.name}</div>
                <div className="text-xs text-slate-500">{BRAND.tagline}</div>
              </div>
            </div>
            <div className="text-xs text-slate-500 max-w-2xl">
              <p>
                Disclaimer: progetto in fase di ricerca e sviluppo. Le
                informazioni hanno scopo illustrativo e potrebbero non
                riflettere l’implementazione finale. Nessuna offerta al
                pubblico, né sollecitazione al risparmio. La partecipazione
                potrà richiedere KYC/AML e dipendere da vincoli normativi.
              </p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. Tutti i diritti
            riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
