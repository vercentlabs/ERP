import sample from "./sample.json";
import { capacityPlanningService } from "../service";

export async function seedCapacityPlanning() {
  return capacityPlanningService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
