import sample from "./sample.json";
import { renewalsService } from "../service";

export async function seedRenewals() {
  return renewalsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
