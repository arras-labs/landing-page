import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { FileText, Info, Users } from "lucide-react";

export default function SocialSection() {
  return (
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
                  Coinvolgiamo i sostenitori nelle scelte chiave via governance.
                  Il modello evolve con il feedback reale.
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
                  Architettura smart contract, flussi di cassa, risk framework,
                  compliance UE. Disponibile a breve per i primi iscritti.
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
  );
}
