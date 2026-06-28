import sample from "./sample.json";
import { shipmentTrackingService } from "../service";

export async function seedShipmentTracking() {
  return shipmentTrackingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
