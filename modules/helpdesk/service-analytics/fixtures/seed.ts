import sample from "./sample.json";
import { serviceAnalyticsService } from "../service";

export async function seedServiceAnalytics() {
  return serviceAnalyticsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
