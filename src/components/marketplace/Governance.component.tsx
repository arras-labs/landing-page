import type { Pool } from "../../types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

export default function OnchainGovernanceSection({ pool }: { pool: Pool }) {
  return (
    <div className="grid lg:grid-cols-3 gap-6 text-sm">
      <Card className="border-slate-200 lg:col-span-2">
        <CardHeader>
          <CardTitle>Contratti & indirizzi</CardTitle>
          <CardDescription>Pool, token quote, multisig</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="text-slate-500">Pool contract</span>
            <div className="font-mono break-all">{pool.poolAddress}</div>
          </div>
          <div>
            <span className="text-slate-500">Token quote</span>
            <div className="font-mono">ERC-20 (placeholder)</div>
          </div>
          <div>
            <span className="text-slate-500">Treasury multisig</span>
            <div className="font-mono">(da definire)</div>
          </div>
          <Separator className="my-2" />
          <div className="text-slate-600">
            Automazioni: oracolo affitti → versamento a contratto → ripartizione
            pro-quota
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Governance</CardTitle>
          <CardDescription>Diritti e voto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>• Quorum: 10% delle quote</div>
          <div>• Voto: 1 quota = 1 voto</div>
          <div>• Durata proposta: 72h</div>
          <div>
            • Oggetto: capex straordinari, cambio property manager,
            riallocazioni
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
