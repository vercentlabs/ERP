import sample from "./sample.json";
import { consolidationService } from "../service";

export async function seedConsolidation() {
  return consolidationService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
