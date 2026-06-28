import sample from "./sample.json";
import { entitlementsService } from "../service";

export async function seedEntitlements() {
  return entitlementsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
