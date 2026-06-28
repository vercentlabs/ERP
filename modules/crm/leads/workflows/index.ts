import { permissions } from "../permissions";
import type { LeadStatus } from "../types";

export const leadStatusTransitions: Record<LeadStatus, LeadStatus[]> = {
  NEW: ["CONTACTED"],
  CONTACTED: ["QUALIFIED", "DISQUALIFIED"],
  QUALIFIED: ["CONVERTED", "DISQUALIFIED"],
  DISQUALIFIED: [],
  CONVERTED: [],
};

export const workflowDefinition = {
  id: "crm.leads.default",
  module: "crm/leads",
  transitions: [
    { from: "NEW", to: "CONTACTED", permission: permissions.update },
    { from: "CONTACTED", to: "QUALIFIED", permission: permissions.update },
    { from: "CONTACTED", to: "DISQUALIFIED", permission: permissions.update },
    { from: "QUALIFIED", to: "CONVERTED", permission: permissions.convert },
    { from: "QUALIFIED", to: "DISQUALIFIED", permission: permissions.update },
  ],
} as const;

export * from "./create.workflow";
export * from "./update.workflow";
export * from "./submit.workflow";
export * from "./approve.workflow";
export * from "./reject.workflow";
export * from "./cancel.workflow";
export * from "./close.workflow";
