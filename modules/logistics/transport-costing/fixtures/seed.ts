import sample from "./sample.json";
import { transportCostingService } from "../service";

export async function seedTransportCosting() {
  return transportCostingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
