import sample from "./sample.json";
import { activitiesService } from "../service";

export async function seedActivities() {
  return activitiesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
