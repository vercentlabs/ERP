import sample from "./sample.json";
import { sparePartsService } from "../service";

export async function seedSpareParts() {
  return sparePartsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
