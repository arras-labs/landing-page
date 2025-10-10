import { Progress } from "../ui/progress";

export function Kpi({
  label,
  value,
  progress,
}: {
  label: string;
  value: React.ReactNode;
  progress?: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
      {typeof progress === "number" && (
        <div className="mt-1">
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
}

export function Pill({
  label,
  value,
  className = "",
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-white p-3 border border-slate-200 ${className}`}
    >
      <div className="text-slate-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

export function StatBox({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
      <div className="text-slate-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
