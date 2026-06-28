import sample from "./sample.json";
import { discreteManufacturingService } from "../service";

export async function seedDiscreteManufacturing() {
  return discreteManufacturingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
