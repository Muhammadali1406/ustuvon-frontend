import { useEffect, useState } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

// Juda tez tugaydigan so'rovlarda spinner bir lahza chiqib-yo'qolib
// "miltillamasligi" uchun — shu vaqtdan uzoqroq davom etsagina ko'rsatamiz.
const SHOW_DELAY_MS = 200;

export function GlobalPendingOverlay() {
  const fetchingCount = useIsFetching({
    predicate: (query) => query.meta?.silent !== true,
  });
  const mutatingCount = useIsMutating({
    predicate: (mutation) => mutation.options.meta?.silent !== true,
  });

  const isPending = fetchingCount > 0 || mutatingCount > 0;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isPending) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [isPending]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Yuklanmoqda"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101826]/20 backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-xl">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#0EBE15] border-t-transparent" />
        <p className="text-sm font-medium text-slate-700">Yuklanmoqda…</p>
      </div>
    </div>
  );
}