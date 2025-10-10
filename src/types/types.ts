import type { Comp, Poi } from "../components/marketplace/PropertyMap.component";

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

export const pois: Poi[] = [
    { id: "p1", type: "metro", name: "Metro XX", lat: 44.5003, lng: 11.3462 },
    { id: "p2", type: "grocery", name: "Supermercato Coop", lat: 44.4935, lng: 11.339 },
    { id: "p3", type: "pharmacy", name: "Farmacia Centrale", lat: 44.4972, lng: 11.3368 },
    { id: "p4", type: "gym", name: "Palestra Fit", lat: 44.4988, lng: 11.348 },
    { id: "p5", type: "bank", name: "ATM Unicredit", lat: 44.495, lng: 11.3471 },
];

// Comparables mock
export const comps: Comp[] = [
    { id: "c1", lat: 44.498, lng: 11.338, address: "Via Rialto 5", rent: 1200, area: 90, euroPerSqm: 13.3, beds: 3, baths: 2, date: "2025-06", sourceUrl: "#" },
    { id: "c2", lat: 44.494, lng: 11.345, address: "Via Indipendenza 12", rent: 1300, area: 95, euroPerSqm: 13.7, beds: 3, baths: 2, date: "2025-07", sourceUrl: "#" },
    { id: "c3", lat: 44.497, lng: 11.349, address: "Via delle Lame 20", rent: 1150, area: 88, euroPerSqm: 13.1, beds: 3, baths: 2, date: "2025-05", sourceUrl: "#" },
];

// MOCK dettaglio immobile
export const property = {
    address: "Via delle Magnolie 18",
    city: "Bologna, Italia",
    year: 2016,
    area: 96,
    beds: 3,
    baths: 2,
    floor: "3° piano con ascensore",
    condition: "Ottimo",
    rentStatus: "Affittato (12 mesi rinnovabile)",
    grossYield: 6.1,
    netYield: 5.4,
    monthlyRent: 1250,
    condoFees: 120,
    images: [
        "/house-images/house1.png",
        "/house-images/house2.png",
        "/house-images/house3.png",
        "/house-images/house4.png",
        "/house-images/house5.png",
        "/house-images/house6.png",
        "/house-images/house7.png",
    ],
    // financials mock
    purchasePrice: 220_000,
    taxesNotary: 9_500,
    refurbish: 12_000,
    furnishing: 5_000,
    originationFee: 3_300,
    reserveFund: 5_000,
};

export const center: [number, number] = [44.4959, 11.343]; // mock Bologna