import sample from "./sample.json";
import { demandPlanningService } from "../service";

export async function seedDemandPlanning() {
  return demandPlanningService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
