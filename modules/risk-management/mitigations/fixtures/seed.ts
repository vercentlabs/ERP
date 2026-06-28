import sample from "./sample.json";
import { mitigationsService } from "../service";

export async function seedMitigations() {
  return mitigationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
