import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { BRAND, fadeUp, FUNDING, HOUSE_IMAGES } from "../../types/types";
import { ImageCarousel } from "./ImageCarousel.component";
import { Progress } from "../ui/progress";
import { Banknote, LineChart, Mail, Rocket, Users } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

const toEUR = (n: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export default function Hero() {
  const progress = Math.min(
    100,
    Math.round((FUNDING.raisedEUR / FUNDING.targetEUR) * 100)
  );
  return (
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
                <Users className="h-4 w-4" /> {FUNDING.backers.toLocaleString()}{" "}
                sostenitori
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
  );
}
