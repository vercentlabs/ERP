import type { DocumentStatus, ActorContext } from "@vercent/shared-types";
import type { WorkflowDefinition, WorkflowAction } from "./workflowDefinition";

export type WorkflowRecord = {
  id: string;
  status: DocumentStatus;
};

export function transitionWorkflow(
  definition: WorkflowDefinition,
  record: WorkflowRecord,
  action: WorkflowAction,
  actor: ActorContext,
) {
  const transition = definition.transitions.find(
    (candidate) => candidate.action === action && candidate.from.includes(record.status),
  );
  if (!transition) {
    throw new Error(`Action ${action} is not valid from ${record.status}`);
  }
  if (!actor.permissions.includes("*") && !actor.permissions.includes(transition.permission)) {
    throw new Error(`Actor lacks permission ${transition.permission}`);
  }
  return {
    ...record,
    status: transition.to,
    updatedAt: new Date().toISOString(),
    updatedBy: actor.actorId,
  };
}
