import sample from "./sample.json";
import { servicePartsService } from "../service";

export async function seedServiceParts() {
  return servicePartsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
