import sample from "./sample.json";
import { safetyStockService } from "../service";

export async function seedSafetyStock() {
  return safetyStockService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
