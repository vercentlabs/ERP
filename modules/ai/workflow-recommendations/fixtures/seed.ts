import sample from "./sample.json";
import { workflowRecommendationsService } from "../service";

export async function seedWorkflowRecommendations() {
  return workflowRecommendationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
