import sample from "./sample.json";
import { customWorkflowsService } from "../service";

export async function seedCustomWorkflows() {
  return customWorkflowsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
