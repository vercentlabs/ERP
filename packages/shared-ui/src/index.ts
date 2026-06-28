export type UiTone = "neutral" | "success" | "warning" | "danger" | "info";

export function getStatusTone(status: string): UiTone {
  const normalized = status.toLowerCase();
  if (["approved", "paid", "complete", "active"].includes(normalized)) return "success";
  if (["pending", "submitted", "open"].includes(normalized)) return "warning";
  if (["rejected", "failed", "cancelled", "overdue"].includes(normalized)) return "danger";
  return "neutral";
}
