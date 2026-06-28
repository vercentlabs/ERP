import sample from "./sample.json";
import { developerPortalService } from "../service";

export async function seedDeveloperPortal() {
  return developerPortalService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
