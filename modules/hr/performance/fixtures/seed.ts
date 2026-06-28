import sample from "./sample.json";
import { performanceService } from "../service";

export async function seedPerformance() {
  return performanceService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
