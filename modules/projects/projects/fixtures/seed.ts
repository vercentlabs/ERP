import sample from "./sample.json";
import { projectsService } from "../service";

export async function seedProjects() {
  return projectsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
