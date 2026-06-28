import sample from "./sample.json";
import { emissionsService } from "../service";

export async function seedEmissions() {
  return emissionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
