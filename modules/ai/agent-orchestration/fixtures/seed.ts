import sample from "./sample.json";
import { agentOrchestrationService } from "../service";

export async function seedAgentOrchestration() {
  return agentOrchestrationService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
