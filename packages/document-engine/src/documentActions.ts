import type { DocumentStatus } from "@vercent/shared-types";

export type DocumentAction = "submit" | "approve" | "reject" | "cancel" | "close";

export const allowedDocumentActions: Record<DocumentStatus, DocumentAction[]> = {
  draft: ["submit", "cancel"],
  submitted: ["approve", "reject", "cancel"],
  approved: ["close", "cancel"],
  rejected: ["submit", "cancel"],
  cancelled: [],
  closed: [],
};
