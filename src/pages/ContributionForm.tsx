import React from "react";
import { ethers } from "ethers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useMetaMask } from "../hooks/meta.hook";

declare global {
  interface Window {
    ethereum?: any;
  }
}

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

const FUNDING = {
  targetEUR: 250_000,
  raisedEUR: 167_400,
  backers: 842,
};

const POOLS: Record<string, Pool> = {
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

// --- Form di contributo con invio ETH al contratto pool ---
export function ContributionForm({ pool }: { pool: Pool }) {
  const [amountEth, setAmountEth] = React.useState<string>("0.05");
  const [sending, setSending] = React.useState(false);
  const [txHash, setTxHash] = React.useState<string | null>(null);
  const { account } = useMetaMask();

  const canSend = !!account && !sending && Number(amountEth) > 0;

  const onSend = async () => {
    try {
      setSending(true);
      setTxHash(null);
      if (!window.ethereum) throw new Error("MetaMask non trovato");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // Primo tentativo: chiamare deposit() se esiste, altrimenti semplice trasferimento
      const ABI = ["function deposit() payable"];
      let usedContract = false;
      try {
        const contract = new ethers.Contract(pool.poolAddress, ABI, signer);
        const tx = await contract.deposit({
          value: ethers.parseEther(amountEth),
        });
        setTxHash(tx.hash);
        await tx.wait();
        usedContract = true;
      } catch (e) {
        // fallback: simple send
      }
      if (!usedContract) {
        const tx = await signer.sendTransaction({
          to: pool.poolAddress,
          value: ethers.parseEther(amountEth),
        });
        setTxHash(tx.hash);
        await tx.wait();
      }
    } catch (err) {
      console.error(err);
      alert((err as Error)?.message ?? "Errore durante il contributo");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle>Contribuisci al pool</CardTitle>
        <CardDescription>
          Invia ETH al contratto del pool. Importo minimo consigliato 0.01 ETH.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm text-slate-600">Importo (ETH)</label>
          <Input
            value={amountEth}
            onChange={(e) => setAmountEth(e.target.value)}
            placeholder="0.05"
          />
          <div className="text-xs text-slate-500 mt-1">
            Indirizzo contratto:{" "}
            <span className="font-mono">{pool.poolAddress}</span>
          </div>
        </div>
        <Button disabled={!canSend} onClick={onSend} className="w-full">
          {sending ? "Invio in corso…" : `Invia ${amountEth || ""} ETH`}
        </Button>
        {txHash && (
          <div className="text-xs text-slate-600">
            Tx inviata: <span className="font-mono break-all">{txHash}</span>
          </div>
        )}
        <p className="text-xs text-slate-500">
          Nota: esempio semplificato. In produzione usa stablecoin EUR/USDC e
          gestisci approvazioni ERC20.
        </p>
      </CardContent>
    </Card>
  );
}
