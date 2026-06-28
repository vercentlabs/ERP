import type { DocumentStatus } from "@vercent/shared-types";
import { allowedDocumentActions, type DocumentAction } from "./documentActions";

const nextStatus: Record<DocumentAction, DocumentStatus> = {
  submit: "submitted",
  approve: "approved",
  reject: "rejected",
  cancel: "cancelled",
  close: "closed",
};

export function applyDocumentAction(status: DocumentStatus, action: DocumentAction) {
  if (!allowedDocumentActions[status].includes(action)) {
    throw new Error(`Cannot ${action} a document in ${status} status`);
  }
  return nextStatus[action];
}
