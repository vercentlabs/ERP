import sample from "./sample.json";
import { landedCostsService } from "../service";

export async function seedLandedCosts() {
  return landedCostsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
