import sample from "./sample.json";
import { techniciansService } from "../service";

export async function seedTechnicians() {
  return techniciansService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
