import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-black/10 bg-slate-50/50 px-6 py-12 text-center ${className}`}
    >
      {Icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm">
          <Icon size={22} />
        </span>
      )}
      <p className="mt-3 text-sm font-medium text-slate-700">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-xs text-slate-400">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}