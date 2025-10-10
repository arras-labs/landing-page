import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function DataRoom() {
  return (
    <div className="grid md:grid-cols-2 gap-4 text-sm">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Documenti principali</CardTitle>
          <CardDescription>Scaricabili (soon)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            • Perizia immobile —{" "}
            <span className="text-slate-500">coming soon</span>
          </div>
          <div>
            • Contratto di locazione —{" "}
            <span className="text-slate-500">coming soon</span>
          </div>
          <div>
            • Polizze assicurative —{" "}
            <span className="text-slate-500">coming soon</span>
          </div>
          <div>
            • APE/Classe energetica —{" "}
            <span className="text-slate-500">coming soon</span>
          </div>
          <div>
            • Verbali condominio —{" "}
            <span className="text-slate-500">coming soon</span>
          </div>
        </CardContent>
      </Card>
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Changelog / Audit log</CardTitle>
          <CardDescription>Trasparenza operativa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>• Deploy pool v1 (placeholder)</div>
          <div>• Apertura raccolta</div>
          <div>• Soglia raggiunta (quando avverrà)</div>
          <div>• Acquisto eseguito (escrow → seller)</div>
          <div>• Primo payout rendite</div>
        </CardContent>
      </Card>
    </div>
  );
}
