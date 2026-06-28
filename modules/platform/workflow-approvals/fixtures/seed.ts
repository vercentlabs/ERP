import sample from "./sample.json";
import { workflowApprovalsService } from "../service";

export async function seedWorkflowApprovals() {
  return workflowApprovalsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
