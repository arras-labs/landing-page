import { ethers } from "ethers";
import React from "react";

export function useMetaMask() {
    const [account, setAccount] = React.useState<string | null>(null);
    const [chainId, setChainId] = React.useState<string | null>(null);
    const [balanceEth, setBalanceEth] = React.useState<number | null>(null);

    const isAvailable = typeof window !== "undefined" && !!window.ethereum;

    const refreshBalance = React.useCallback(async (addr?: string | null) => {
        if (!window.ethereum || !addr) { setBalanceEth(null); return; }
        try {
            // RAW RPC
            const balHex: string = await window.ethereum.request({
                method: "eth_getBalance",
                params: [addr, "latest"],
            });
            const bal = Number(ethers.formatEther(BigInt(balHex)));
            setBalanceEth(bal);

            // Alternativa via ethers:
            // const provider = new ethers.BrowserProvider(window.ethereum);
            // const balWei = await provider.getBalance(addr);
            // setBalanceEth(Number(ethers.formatEther(balWei)));
        } catch {
            setBalanceEth(null);
        }
    }, []);

    const connect = async () => {
        if (!isAvailable) throw new Error("MetaMask non disponibile");
        const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
        const addr = accounts?.[0] ?? null;
        setAccount(addr);
        const cid = await window.ethereum.request({ method: "eth_chainId" });
        setChainId(cid ?? null);
        await refreshBalance(addr);
        return addr;
    };

    React.useEffect(() => {
        if (!isAvailable) return;

        (async () => {
            try {
                const accs: string[] = await window.ethereum.request({ method: "eth_accounts" });
                const addr = accs?.[0] ?? null;
                setAccount(addr);
                const cid = await window.ethereum.request({ method: "eth_chainId" });
                setChainId(cid ?? null);
                await refreshBalance(addr);
            } catch {
                // ignore
            }
        })();

        const onAccounts = (accs: string[]) => {
            const addr = accs?.[0] ?? null;
            setAccount(addr);
            refreshBalance(addr);
        };

        const onChain = async (cid: string) => {
            setChainId(cid ?? null);
            try {
                const accs: string[] = await window.ethereum.request({ method: "eth_accounts" });
                await refreshBalance(accs?.[0] ?? null);
            } catch {
                refreshBalance(null);
            }
        };

        window.ethereum.on?.("accountsChanged", onAccounts);
        window.ethereum.on?.("chainChanged", onChain);
        return () => {
            window.ethereum?.removeListener?.("accountsChanged", onAccounts);
            window.ethereum?.removeListener?.("chainChanged", onChain);
        };
    }, [isAvailable, refreshBalance]);

    // Ritorno sia balanceEth che alias "balance" per compatibilità
    return { isAvailable, account, chainId, balanceEth, balance: balanceEth, connect };
}
