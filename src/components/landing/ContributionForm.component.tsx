import React from "react";
import { ethers } from "ethers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMetaMask } from "../../hooks/meta.hook";
import type { Pool } from "../../types/types";

// --- Form di contributo con invio ETH al contratto pool ---
export function ContributionForm({ pool }: { pool: Pool }) {
  const [amountEth, setAmountEth] = React.useState<string>("0.05");
  const [sending, setSending] = React.useState(false);
  const [txHash, setTxHash] = React.useState<string | null>(null);

  // Nuovo: stime e stato transazione
  const [estGasEth, setEstGasEth] = React.useState<string | null>(null);
  const [gasPriceGwei, setGasPriceGwei] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<
    "idle" | "estimating" | "awaiting" | "pending" | "confirmed" | "error"
  >("idle");

  const { account, balanceEth } = useMetaMask();

  const [ethEur, setEthEur] = React.useState<number | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
        );
        const j = await r.json();
        const eur = j?.ethereum?.eur;
        if (typeof eur === "number") setEthEur(eur);
      } catch {}
    })();
  }, []);

  const canSend = !!account && !sending && Number(amountEth) > 0;

  const toEUR = (n: number) =>
    new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);

  const fmt = (n?: number | null, d = 6) =>
    n == null ? "-" : Number(n).toFixed(d);

  // Stima gas: prova deposit(), altrimenti semplice transfer
  const estimateGas = React.useCallback(async () => {
    if (!window.ethereum) return;
    if (!amountEth || Number(amountEth) <= 0) return;
    try {
      setStatus("estimating");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice ?? feeData.maxFeePerGas;
      if (gasPrice) setGasPriceGwei((Number(gasPrice) / 1e9).toFixed(2));

      let gas;
      const value = ethers.parseEther(amountEth);
      try {
        const ABI = ["function deposit() payable"];
        const contract = new ethers.Contract(pool.poolAddress, ABI, signer);
        // @ts-ignore
        gas = await contract.deposit.estimateGas({ value });
      } catch {
        gas = await provider.estimateGas({ to: pool.poolAddress, value });
      }

      const gasEth =
        gas && gasPrice ? Number(ethers.formatEther(gas * gasPrice)) : 0.000021; // fallback ~21k gas
      setEstGasEth(gasEth.toFixed(6));
      setStatus("idle");
    } catch {
      setEstGasEth(null);
      setStatus("idle");
    }
  }, [amountEth, pool.poolAddress]);

  React.useEffect(() => {
    estimateGas();
  }, [estimateGas]);

  const totalEth = (() => {
    const amt = Number(amountEth || 0);
    const gas = Number(estGasEth || 0);
    return amt + gas;
  })();

  const onQuick = (delta: number) => {
    const next = Number(amountEth || 0) + delta;
    setAmountEth(next.toFixed(3));
  };

  const onSend = async () => {
    try {
      setSending(true);
      setStatus("awaiting");
      setTxHash(null);
      if (!window.ethereum) throw new Error("MetaMask non trovato");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const value = ethers.parseEther(amountEth);

      // 1) Tenta deposit()
      const ABI = ["function deposit() payable"];
      let usedContract = false;
      try {
        const contract = new ethers.Contract(pool.poolAddress, ABI, signer);
        const tx = await contract.deposit({ value });
        setTxHash(tx.hash);
        setStatus("pending");
        await tx.wait();
        usedContract = true;
      } catch {
        // 2) Fallback: sendTransaction
      }
      if (!usedContract) {
        const tx = await signer.sendTransaction({
          to: pool.poolAddress,
          value,
        });
        setTxHash(tx.hash);
        setStatus("pending");
        await tx.wait();
      }
      setStatus("confirmed");
    } catch (err) {
      console.error(err);
      setStatus("error");
      alert((err as Error)?.message ?? "Errore durante il contributo");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="relative overflow-hidden border-slate-200">
      {/* Accento visivo */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />
      <CardHeader>
        <CardTitle>Contribuisci al pool</CardTitle>
        <CardDescription>
          Invia ETH al contratto del pool. Importo minimo consigliato 0.01 ETH.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Importo + quick actions */}
        <div>
          <label className="text-sm text-slate-600">Importo</label>
          <div className="mt-1 relative">
            <Input
              value={amountEth}
              onChange={(e) => setAmountEth(e.target.value)}
              placeholder="0.05"
              className="pr-16"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              ETH
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAmountEth("0.01")}
            >
              0.01
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAmountEth("0.05")}
            >
              0.05
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAmountEth("0.10")}
            >
              0.10
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onQuick(0.01)}
              disabled={!balanceEth || totalEth + 0.05 > Number(balanceEth)}
            >
              +0.01
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onQuick(0.05)}
              disabled={!balanceEth || totalEth + 0.05 > Number(balanceEth)}
            >
              +0.05
            </Button>
          </div>

          {/* Slider semplice, senza librerie extra */}
          <input
            type="range"
            min={0.01}
            max={balanceEth ? Number(balanceEth) : 1}
            step={0.01}
            value={Number(amountEth) || 0}
            onChange={(e) => setAmountEth(Number(e.target.value).toFixed(2))}
            className="mt-3 w-full"
          />
        </div>

        {/* Riepilogo costi / estetica migliorata */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="flex justify-between">
            <span>Importo</span>
            <span className="font-medium">
              {fmt(Number(amountEth), 4)} ETH{" "}
              <span className="text-slate-500">
                ({ethEur != null ? toEUR(Number(amountEth) * ethEur) : "-"})
              </span>
            </span>
          </div>
          <div className="flex justify-between">
            <span>Gas stimato</span>
            <span className="font-medium">
              {estGasEth ? `${estGasEth} ETH` : "-"}{" "}
              {gasPriceGwei ? (
                <span className="text-slate-500">(~{gasPriceGwei} Gwei)</span>
              ) : null}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Totale stimato</span>
            <span className="font-semibold">
              {fmt(Number(amountEth) + Number(estGasEth || 0), 4)} ETH{" "}
              <span className="text-slate-500">
                ({toEUR((Number(amountEth) + Number(estGasEth || 0)) * ethEur!)}
                )
              </span>
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button
          disabled={!canSend}
          onClick={onSend}
          className="w-full h-11"
          variant="outline"
        >
          {sending || status === "awaiting" || status === "pending"
            ? "Invio in corso…"
            : `Invia ${amountEth || ""} ETH`}
        </Button>

        {/* Stato tx */}
        {txHash && (
          <div className="text-xs text-slate-600">
            Tx inviata: <span className="font-mono break-all">{txHash}</span>
          </div>
        )}
        <div className="text-xs text-slate-500">
          Stato:
          {status === "idle" && " pronto"}
          {status === "estimating" && " stima gas…"}
          {status === "awaiting" && " in attesa di firma…"}
          {status === "pending" && " in attesa di conferma…"}
          {status === "confirmed" && " confermata ✅"}
          {status === "error" && " errore"}
        </div>

        <p className="text-xs text-slate-500">
          Nota: esempio semplificato. In produzione usa stablecoin (es.
          EURC/USDC) con flusso approve + transfer e aggiungi controlli min/max,
          cap per wallet e protezioni anti-bot.
        </p>
      </CardContent>
    </Card>
  );
}
