import sample from "./sample.json";
import { manufacturingAnalyticsService } from "../service";

export async function seedManufacturingAnalytics() {
  return manufacturingAnalyticsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
