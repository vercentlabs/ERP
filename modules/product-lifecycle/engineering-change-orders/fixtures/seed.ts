import sample from "./sample.json";
import { engineeringChangeOrdersService } from "../service";

export async function seedEngineeringChangeOrders() {
  return engineeringChangeOrdersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
