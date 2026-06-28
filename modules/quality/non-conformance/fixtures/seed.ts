import sample from "./sample.json";
import { nonConformanceService } from "../service";

export async function seedNonConformance() {
  return nonConformanceService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
