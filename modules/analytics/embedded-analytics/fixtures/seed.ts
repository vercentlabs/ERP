import sample from "./sample.json";
import { embeddedAnalyticsService } from "../service";

export async function seedEmbeddedAnalytics() {
  return embeddedAnalyticsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
