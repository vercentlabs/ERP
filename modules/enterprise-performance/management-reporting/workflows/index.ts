import type { WorkflowDefinition } from "@vercent/workflows/workflowDefinition";
import { permissions } from "../permissions";

export const workflowDefinition: WorkflowDefinition = {
  id: "enterprise-performance/management-reporting.default",
  module: "enterprise-performance/management-reporting",
  transitions: [
    { action: "submit", from: ["draft", "rejected"], to: "submitted", permission: permissions.submit },
    { action: "approve", from: ["submitted"], to: "approved", permission: permissions.approve },
    { action: "reject", from: ["submitted"], to: "rejected", permission: permissions.reject },
    { action: "cancel", from: ["draft", "submitted", "approved", "rejected"], to: "cancelled", permission: permissions.cancel },
    { action: "close", from: ["approved"], to: "closed", permission: permissions.close },
  ],
};

export * from "./create.workflow";
export * from "./update.workflow";
export * from "./submit.workflow";
export * from "./approve.workflow";
export * from "./reject.workflow";
export * from "./cancel.workflow";
export * from "./close.workflow";
