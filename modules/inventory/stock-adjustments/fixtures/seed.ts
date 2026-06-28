import sample from "./sample.json";
import { stockAdjustmentsService } from "../service";

export async function seedStockAdjustments() {
  return stockAdjustmentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
