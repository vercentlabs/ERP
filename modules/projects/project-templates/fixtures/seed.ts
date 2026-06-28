import sample from "./sample.json";
import { projectTemplatesService } from "../service";

export async function seedProjectTemplates() {
  return projectTemplatesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
