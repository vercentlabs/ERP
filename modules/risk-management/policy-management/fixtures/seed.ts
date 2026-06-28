import sample from "./sample.json";
import { policyManagementService } from "../service";

export async function seedPolicyManagement() {
  return policyManagementService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
