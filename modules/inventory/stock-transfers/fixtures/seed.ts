import sample from "./sample.json";
import { stockTransfersService } from "../service";

export async function seedStockTransfers() {
  return stockTransfersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
