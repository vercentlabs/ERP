import sample from "./sample.json";
import { purchaseReturnsService } from "../service";

export async function seedPurchaseReturns() {
  return purchaseReturnsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
