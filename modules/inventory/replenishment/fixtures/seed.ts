import sample from "./sample.json";
import { replenishmentService } from "../service";

export async function seedReplenishment() {
  return replenishmentService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
