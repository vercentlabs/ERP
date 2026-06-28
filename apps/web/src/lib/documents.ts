export type DocumentAction = "submit" | "approve" | "reject" | "cancel" | "close";

export function nextDocumentAction(status: string): DocumentAction | undefined {
  if (status === "draft") return "submit";
  if (status === "submitted") return "approve";
  if (status === "approved") return "close";
  return undefined;
}
