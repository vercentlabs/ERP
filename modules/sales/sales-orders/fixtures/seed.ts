import sample from "./sample.json";
import { salesOrdersService } from "../service";

export async function seedSalesOrders() {
  return salesOrdersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
