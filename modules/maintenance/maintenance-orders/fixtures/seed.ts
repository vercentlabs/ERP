import sample from "./sample.json";
import { maintenanceOrdersService } from "../service";

export async function seedMaintenanceOrders() {
  return maintenanceOrdersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
