import sample from "./sample.json";
import { purchaseContractsService } from "../service";

export async function seedPurchaseContracts() {
  return purchaseContractsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
