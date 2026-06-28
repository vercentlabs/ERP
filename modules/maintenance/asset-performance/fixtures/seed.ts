import sample from "./sample.json";
import { assetPerformanceService } from "../service";

export async function seedAssetPerformance() {
  return assetPerformanceService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
