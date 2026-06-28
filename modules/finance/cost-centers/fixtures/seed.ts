import sample from "./sample.json";
import { costCentersService } from "../service";

export async function seedCostCenters() {
  return costCentersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
