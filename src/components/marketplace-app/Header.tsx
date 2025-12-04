import type { WalletState } from "../../types-marketplace";
import { NETWORK_NAME } from "../../utils-marketplace/constants";

interface HeaderProps {
  walletState: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Header = ({
  walletState,
  onConnect,
  onDisconnect,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* LEFT: Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 opacity-30 blur transition-opacity duration-200" />
              <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-black text-white shadow-lg">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-lg font-bold tracking-tight text-slate-900">
                Real Estate DApp
              </span>
              <span className="text-xs text-slate-500">{NETWORK_NAME}</span>
            </div>
          </div>

          {/* RIGHT: Wallet Info & Actions */}
          <div className="flex items-center gap-3">
            {walletState.isConnected ? (
              <>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Saldo</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {walletState.balance
                        ? parseFloat(walletState.balance).toFixed(4)
                        : "0"}{" "}
                      ETH
                    </p>
                  </div>
                  <div className="bg-slate-100 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500">Account</p>
                    <p className="text-sm font-mono font-semibold text-slate-900">
                      {walletState.account?.slice(0, 6)}...
                      {walletState.account?.slice(-4)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onDisconnect}
                  className="px-4 py-2 rounded-lg transition-all text-sm font-medium border border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                >
                  Disconnetti
                </button>
              </>
            ) : (
              <button
                onClick={onConnect}
                className="px-6 py-2 rounded-lg transition-all font-semibold shadow-md bg-gradient-to-r from-amber-500 to-pink-500 text-white hover:opacity-90 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Connetti Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
