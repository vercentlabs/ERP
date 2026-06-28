import sample from "./sample.json";
import { projectTasksService } from "../service";

export async function seedProjectTasks() {
  return projectTasksService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
