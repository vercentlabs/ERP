import sample from "./sample.json";
import { routePlanningService } from "../service";

export async function seedRoutePlanning() {
  return routePlanningService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
