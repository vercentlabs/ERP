import sample from "./sample.json";
import { shipmentsService } from "../service";

export async function seedShipments() {
  return shipmentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
