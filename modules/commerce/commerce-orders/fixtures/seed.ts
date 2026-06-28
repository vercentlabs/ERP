import sample from "./sample.json";
import { commerceOrdersService } from "../service";

export async function seedCommerceOrders() {
  return commerceOrdersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
