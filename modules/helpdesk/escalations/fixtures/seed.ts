import sample from "./sample.json";
import { escalationsService } from "../service";

export async function seedEscalations() {
  return escalationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
