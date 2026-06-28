import sample from "./sample.json";
import { consentManagementService } from "../service";

export async function seedConsentManagement() {
  return consentManagementService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
