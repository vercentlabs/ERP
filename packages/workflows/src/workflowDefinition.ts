import type { DocumentStatus } from "@vercent/shared-types";

export type WorkflowAction = "create" | "update" | "submit" | "approve" | "reject" | "cancel" | "close";

export type WorkflowTransition = {
  action: WorkflowAction;
  from: DocumentStatus[];
  to: DocumentStatus;
  permission: string;
};

export type WorkflowDefinition = {
  id: string;
  module: string;
  transitions: WorkflowTransition[];
};
