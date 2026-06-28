import sample from "./sample.json";
import { wholesaleDistributionService } from "../service";

export async function seedWholesaleDistribution() {
  return wholesaleDistributionService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
