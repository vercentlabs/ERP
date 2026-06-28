import sample from "./sample.json";
import { blanketOrdersService } from "../service";

export async function seedBlanketOrders() {
  return blanketOrdersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
