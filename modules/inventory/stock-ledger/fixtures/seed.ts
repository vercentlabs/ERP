import sample from "./sample.json";
import { stockLedgerService } from "../service";

export async function seedStockLedger() {
  return stockLedgerService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
