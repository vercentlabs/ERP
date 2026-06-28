import sample from "./sample.json";
import { productionCostingService } from "../service";

export async function seedProductionCosting() {
  return productionCostingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
