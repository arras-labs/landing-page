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

// -------------------------------------------------------------
// Configurazione rapida (modifica questi valori per personalizzare)
// -------------------------------------------------------------
const BRAND = {
  name: "CasaChain",
  tagline: "Investire nel mattone, insieme.",
  ctaPrimary: "Entra nella waitlist",
  ctaSecondary: "Scarica il whitepaper",
  emailCapturePlaceholder: "La tua email aziendale",
};

const FUNDING = {
  targetEUR: 250_000,
  raisedEUR: 167_400,
  backers: 842,
};

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

const ROADMAP = [
  {
    q: "Q4 2025",
    title: "MVP on‑chain & waitlist",
    items: [
      "Smart contract pool v1",
      "Dashboard investitori",
      "Programma ambassador",
    ],
  },
  {
    q: "Q1 2026",
    title: "Primo immobile",
    items: [
      "Due diligence legale & fiscale",
      "Acquisto con escrow on‑chain",
      "Distribuzione rendite beta",
    ],
  },
  {
    q: "Q2 2026",
    title: "Scalabilità",
    items: [
      "Multi‑asset pool",
      "Mercato secondario quote",
      "Integrazione stablecoin EUR",
    ],
  },
  {
    q: "Q3 2026",
    title: "Compliance UE",
    items: ["MiCA readiness", "KYC/AML avanzato", "Audit smart contract"],
  },
];

const FAQ = [
  {
    q: "È un consiglio finanziario?",
    a: "No. CasaChain è un progetto sperimentale. Nulla in questa pagina costituisce sollecitazione al pubblico risparmio o consulenza finanziaria.",
  },
  {
    q: "Come vengono pagate le rendite?",
    a: "Gli affitti, al netto dei costi, vengono inviati periodicamente dallo smart contract agli indirizzi dei partecipanti, in proporzione alla loro quota.",
  },
  {
    q: "Che blockchain usate?",
    a: "Partiremo su una chain EVM‑compatibile con commissioni basse e supporto a stablecoin EUR. La scelta finale sarà comunicata nel whitepaper.",
  },
  {
    q: "Cosa succede se non si raggiunge la soglia?",
    a: "I fondi restano nel pool. Dopo una finestra temporale prestabilita, gli utenti potranno ritirare i depositi o votare un nuovo target.",
  },
  {
    q: "Aspetti legali?",
    a: "Stiamo lavorando con consulenti per incorniciare correttamente il modello (MiCA/UE, KYC/AML, fiscalità). Gli aggiornamenti saranno nel whitepaper.",
  },
];

// Utility per formattare EUR
const toEUR = (n: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

// Varianti di animazione
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function App() {
  const progress = Math.min(
    100,
    Math.round((FUNDING.raisedEUR / FUNDING.targetEUR) * 100)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center">
              <House className="h-5 w-5" />
            </div>
            <span className="font-semibold">{BRAND.name}</span>
            <Badge variant="secondary" className="ml-2">
              alpha
            </Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#come-funziona" className="hover:text-slate-600">
              Come funziona
            </a>
            <a href="#roadmap" className="hover:text-slate-600">
              Roadmap
            </a>
            <a href="#tokenomics" className="hover:text-slate-600">
              Rendite
            </a>
            <a href="#faq" className="hover:text-slate-600">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              {BRAND.ctaSecondary}
            </Button>
            <Button size="sm" className="gap-2" variant="outline">
              {BRAND.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
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
        className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-14"
      >
        <div className="text-center mb-10">
          <Badge variant="secondary">Come funziona</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Dal deposito alla rendita, in 4 step
          </h2>
          <p className="mt-2 text-slate-600">
            Tutto tracciato on‑chain, con processi automatizzati e auditabili.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS.map((s, i) => (
            <motion.div key={i} {...fadeUp} className="">
              <Card className="h-full border-slate-200">
                <CardContent className="pt-6">
                  <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white grid place-items-center mb-4">
                    {s.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TOKENOMICS / REVENUE */}
      <section id="tokenomics" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1">
              <Badge variant="outline">Rendite & ripartizione</Badge>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Come fluiscono gli affitti
              </h2>
              <p className="mt-2 text-slate-600">
                Le locazioni vengono incassate off‑chain (locatore → startup). A
                cadenza definita, la quota netta viene inviata allo smart
                contract che ripartisce verso gli indirizzi dei partecipanti.
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5" /> Quote
                  proporzionali all’importo versato
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5" /> Fondo manutenzione
                  e assicurazione
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5" /> Reportistica
                  pubblica e verificabile
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-5">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Esempio di ripartizione
                    </CardTitle>
                    <CardDescription>Immobiliare #001 (stima)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                        <div className="text-slate-500">Affitto mensile</div>
                        <div className="font-semibold">€ 1.250</div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                        <div className="text-slate-500">Spese & fondo</div>
                        <div className="font-semibold">€ 250</div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                        <div className="text-slate-500">
                          Netto a distribuire
                        </div>
                        <div className="font-semibold">€ 1.000</div>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                        <div className="text-slate-500">Frequenza</div>
                        <div className="font-semibold">Mensile</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Garanzie & governance
                    </CardTitle>
                    <CardDescription>
                      Protezione capitale e voto
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <ShieldCheck className="h-4 w-4 mt-0.5" /> Multi‑sig per
                        operazioni critiche
                      </li>
                      <li className="flex gap-2">
                        <ShieldCheck className="h-4 w-4 mt-0.5" /> Oracoli per
                        trigger di payout
                      </li>
                      <li className="flex gap-2">
                        <ShieldCheck className="h-4 w-4 mt-0.5" /> Votazioni su
                        interventi straordinari
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section
        id="roadmap"
        className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-10">
          <Badge variant="secondary">Roadmap</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Il percorso verso il primo immobile
          </h2>
          <p className="mt-2 text-slate-600">
            Step chiari, milestone misurabili, trasparenza sui rilasci.
          </p>
        </div>
        <div className="grid lg:grid-cols-4 gap-5">
          {ROADMAP.map((r, i) => (
            <Card key={i} className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    <Calendar className="h-3.5 w-3.5 mr-1" /> {r.q}
                  </Badge>
                  {i === 0 ? (
                    <Badge>In corso</Badge>
                  ) : (
                    <Badge variant="secondary">Prossimo</Badge>
                  )}
                </div>
                <CardTitle className="text-lg mt-2">{r.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {r.items.map((it, j) => (
                    <li key={j} className="flex gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5" /> {it}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF / CARDS */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4" /> Trasparenza by‑design
                </CardTitle>
                <CardDescription>Tutto verificabile</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Dati di raccolta, quote e rendite sono pubblici e consultabili.
                Ogni operazione è tracciata on‑chain.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" /> Community‑first
                </CardTitle>
                <CardDescription>Costruiamo con voi</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Coinvolgiamo i sostenitori nelle scelte chiave via governance.
                Il modello evolve con il feedback reale.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Whitepaper
                </CardTitle>
                <CardDescription>Specifiche tecniche</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Architettura smart contract, flussi di cassa, risk framework,
                compliance UE. Disponibile a breve per i primi iscritti.
              </CardContent>
            </Card>
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
