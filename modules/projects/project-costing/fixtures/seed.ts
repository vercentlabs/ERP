import sample from "./sample.json";
import { projectCostingService } from "../service";

export async function seedProjectCosting() {
  return projectCostingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
