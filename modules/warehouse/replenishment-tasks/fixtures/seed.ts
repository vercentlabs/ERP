import sample from "./sample.json";
import { replenishmentTasksService } from "../service";

export async function seedReplenishmentTasks() {
  return replenishmentTasksService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
