import sample from "./sample.json";
import { deferredRevenueService } from "../service";

export async function seedDeferredRevenue() {
  return deferredRevenueService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
