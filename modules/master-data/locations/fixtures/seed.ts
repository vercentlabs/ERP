import sample from "./sample.json";
import { locationsService } from "../service";

export async function seedLocations() {
  return locationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
