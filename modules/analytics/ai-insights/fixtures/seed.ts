import sample from "./sample.json";
import { aiInsightsService } from "../service";

export async function seedAiInsights() {
  return aiInsightsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
