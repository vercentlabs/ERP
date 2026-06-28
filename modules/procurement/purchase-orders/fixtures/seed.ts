import sample from "./sample.json";
import { purchaseOrdersService } from "../service";

export async function seedPurchaseOrders() {
  return purchaseOrdersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
