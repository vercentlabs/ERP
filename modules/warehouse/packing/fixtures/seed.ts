import sample from "./sample.json";
import { packingService } from "../service";

export async function seedPacking() {
  return packingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
