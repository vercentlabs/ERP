import sample from "./sample.json";
import { pickingService } from "../service";

export async function seedPicking() {
  return pickingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
