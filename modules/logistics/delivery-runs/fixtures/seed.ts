import sample from "./sample.json";
import { deliveryRunsService } from "../service";

export async function seedDeliveryRuns() {
  return deliveryRunsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
