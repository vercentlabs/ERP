import sample from "./sample.json";
import { resourcePlanningService } from "../service";

export async function seedResourcePlanning() {
  return resourcePlanningService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
