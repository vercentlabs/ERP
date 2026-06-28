import sample from "./sample.json";
import { productionOrdersService } from "../service";

export async function seedProductionOrders() {
  return productionOrdersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
