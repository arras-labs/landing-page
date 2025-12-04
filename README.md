# CasaChain Landing Page

Landing page per CasaChain con marketplace integrato per la tokenizzazione immobiliare.

## Accesso al Marketplace

La landing page include un marketplace completo accessibile cliccando sul bottone **"Marketplace"** nella barra di navigazione in alto. Il marketplace permette di:

- Visualizzare tutti i pool immobiliari disponibili
- Investire in proprietà tokenizzate
- Creare nuovi pool immobiliari
- Gestire i propri investimenti

## Setup Iniziale

### 1. Deploy dello Smart Contract

Prima di avviare la landing page, devi avere il file .env sulla repo `contracts` correttamente compilato (vedi .env.example), poi avvia lo script:

```bash
cd ../contracts
./auto-setup.sh
```

e inserisci la private key che trovi nel docker all'interno del .env sempre di `contracts`.

Lo script `auto-setup.sh` ti fa selezionare tra Ganache e Polygon Amoi, seleziona il primo (tenere Docker sempre attivo), il deploy del contratto parte automaticamente. Successivamente quando chiede se si vuole runnare anche il front end seleziona No. Copia l'address del contratto nel file .env di landing page.

Inoltre configura la rete ganache su Metamask e crea almeno due address, uno dei quali è colui che deploya il contratto con degli immobili di placeholder su cui fare dei test acquistando token con l'altro address.

### 2. Configurazione del file .env

Copia il file `.env.example` in `.env` e modifica le seguenti variabili:

```bash
cp .env.example .env
```

Variabili da configurare:

- **VITE_CONTRACT_ADDRESS**: Inserisci l'indirizzo del contratto ottenuto dal deploy (es. `0x06F4a48b62a09426B2cfeA745771299199A1c57D`)
- **VITE_CHAIN_ID**: `1337` per Ganache locale
- **VITE_NETWORK_NAME**: `Ganache Local`
- **VITE_DROPBOX_ACCESS_TOKEN**: Token di accesso Dropbox per la gestione dei documenti (opzionale per il primo test)

### 3. Installazione e Avvio

```bash
npm install
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`
