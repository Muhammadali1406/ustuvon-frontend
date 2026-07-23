export function percentBadge(percent: number) {
  const tone =
    percent >= 80
      ? "bg-emerald-50 text-emerald-700"
      : percent >= 50
        ? "bg-amber-50 text-amber-700"
        : "bg-rose-50 text-rose-700";
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${tone}`}
    >
      {percent}%
    </span>
  );
}
