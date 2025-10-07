declare global {
    interface Window {
        ethereum?: any;
    }
}

export const FUNDING = {
    targetEUR: 250_000,
    raisedEUR: 167_400,
    backers: 842,
};

// Modello dati minimale per i pool
export type Pool = {
    id: string;
    title: string;
    description?: string;
    targetEUR: number;
    raisedEUR: number;
    backers: number;
    network: string;
    poolAddress: `0x${string}`;
    yieldEstimate?: number;
    deadline?: string;
};

export const POOLS: Record<string, Pool> = {
    "001": {
        id: "001",
        title: "Pool Immobile #001",
        description: "Trilocale semicentrale, stima rendimento 6.1% annuo",
        targetEUR: FUNDING.targetEUR,
        raisedEUR: FUNDING.raisedEUR,
        backers: FUNDING.backers,
        network: "EVM Testnet",
        poolAddress: "0x1111111111111111111111111111111111111111",
        yieldEstimate: 6.1,
        deadline: "2026-01-31",
    },
};

export const BRAND = {
    name: "CasaChain",
    tagline: "Investire nel mattone, insieme.",
    ctaPrimary: "Entra nella waitlist",
    ctaSecondary: "Scarica il whitepaper",
    emailCapturePlaceholder: "La tua email aziendale",
};


export const HOUSE_IMAGES = [
    "/house-images/house1.png",
    "/house-images/house2.png",
    "/house-images/house3.png",
    "/house-images/house4.png",
    "/house-images/house5.png",
    "/house-images/house6.png",
    "/house-images/house7.png",
];

export const ROADMAP = [
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

export const FAQ = [
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

// Varianti di animazione
export const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};