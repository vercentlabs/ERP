import sample from "./sample.json";
import { processManufacturingService } from "../service";

export async function seedProcessManufacturing() {
  return processManufacturingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
