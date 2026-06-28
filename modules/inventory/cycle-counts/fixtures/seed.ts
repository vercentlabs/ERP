import sample from "./sample.json";
import { cycleCountsService } from "../service";

export async function seedCycleCounts() {
  return cycleCountsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
