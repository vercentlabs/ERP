import sample from "./sample.json";
import { serviceWorkOrdersService } from "../service";

export async function seedServiceWorkOrders() {
  return serviceWorkOrdersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
