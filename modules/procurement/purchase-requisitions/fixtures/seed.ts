import sample from "./sample.json";
import { purchaseRequisitionsService } from "../service";

export async function seedPurchaseRequisitions() {
  return purchaseRequisitionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
