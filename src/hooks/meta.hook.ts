import React from "react";

export function useMetaMask() {
    const [account, setAccount] = React.useState<string | null>(null);
    const [chainId, setChainId] = React.useState<string | null>(null);

    const isAvailable = typeof window !== "undefined" && !!window.ethereum;

    const connect = async () => {
        if (!isAvailable) throw new Error("MetaMask non disponibile");
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts?.[0] ?? null);
        const cid = await window.ethereum.request({ method: "eth_chainId" });
        setChainId(cid ?? null);
    };

    React.useEffect(() => {
        if (!isAvailable) return;
        // 1) Leggi stato iniziale (se l'utente aveva già autorizzato)
        (async () => {
            try {
                const accs = await window.ethereum.request({ method: "eth_accounts" });
                setAccount(accs?.[0] ?? null);
                const cid = await window.ethereum.request({ method: "eth_chainId" });
                setChainId(cid ?? null);
            } catch (e) {
                // ignora
            }
        })();
        // 2) Ascolta cambi account/chain
        const onAccounts = (accs: string[]) => setAccount(accs?.[0] ?? null);
        const onChain = (cid: string) => setChainId(cid ?? null);
        window.ethereum.on?.("accountsChanged", onAccounts);
        window.ethereum.on?.("chainChanged", onChain);
        return () => {
            window.ethereum?.removeListener?.("accountsChanged", onAccounts);
            window.ethereum?.removeListener?.("chainChanged", onChain);
        };
    }, [isAvailable]);

    return { isAvailable, account, chainId, connect };
}