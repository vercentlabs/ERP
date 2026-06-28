import sample from "./sample.json";
import { programsService } from "../service";

export async function seedPrograms() {
  return programsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
