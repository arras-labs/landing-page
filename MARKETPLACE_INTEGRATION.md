# Marketplace Integration

Il marketplace è stato integrato nella landing page. Ecco come funziona:

## Struttura

### Cartelle create:

- `/marketplace` - Contiene i typechain-types e artifacts del contratto
- `/src/components/marketplace-app` - Componenti del marketplace
- `/src/hooks-marketplace` - Hook useWeb3 per interagire con il contratto
- `/src/services-marketplace` - Servizi per Dropbox e gestione immagini
- `/src/types-marketplace` - Tipi TypeScript del marketplace
- `/src/utils-marketplace` - Costanti e configurazione del contratto

### File creati/modificati:

- `/src/pages/Marketplace.page.tsx` - Pagina principale del marketplace
- `/src/main.tsx` - Aggiunto route `/marketplace/*`
- `/src/components/landing/Hero.component.tsx` - Aggiunto pulsante Marketplace
- `/.env` - Configurazione variabili d'ambiente
- `/.env.example` - Template configurazione
- `/package.json` - Aggiunte dipendenze: react-hot-toast, dropbox

## Configurazione

### 1. Variabili d'ambiente

Copia `.env.example` in `.env` e configura:

- `VITE_CONTRACT_ADDRESS` - Indirizzo del contratto deployato
- `VITE_CHAIN_ID` - ID della chain (1337 per Ganache)
- `VITE_NETWORK_NAME` - Nome della rete
- `VITE_DROPBOX_ACCESS_TOKEN` - Token Dropbox per upload documenti

### 2. Avviare il marketplace

```bash
npm run dev
```

Poi naviga su http://localhost:5173/marketplace

## Funzionalità

Il marketplace include tutte le funzionalità del contratto frontend:

- ✅ Connessione wallet
- ✅ Visualizzazione proprietà attive
- ✅ Acquisto token
- ✅ Creazione nuove pool
- ✅ Gestione documenti via Dropbox
- ✅ Visualizzazione rendimenti
- ✅ Gestione delle proprie proprietà e investimenti

## Note

- Il pulsante "Marketplace" è presente nella Hero section della landing page
- Il marketplace usa lo stesso contratto deployato in `/contracts`
- Assicurati che Ganache sia in esecuzione se usi la rete locale
