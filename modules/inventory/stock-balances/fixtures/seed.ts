import sample from "./sample.json";
import { stockBalancesService } from "../service";

export async function seedStockBalances() {
  return stockBalancesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
