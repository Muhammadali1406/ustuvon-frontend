import type { ReactNode } from "react";

export function ChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="mb-4 text-sm font-medium text-slate-700">{title}</p>
      {children}
    </div>
  );
}
