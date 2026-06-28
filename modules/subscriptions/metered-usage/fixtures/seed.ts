import sample from "./sample.json";
import { meteredUsageService } from "../service";

export async function seedMeteredUsage() {
  return meteredUsageService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
