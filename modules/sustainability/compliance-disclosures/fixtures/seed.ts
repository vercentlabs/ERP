import sample from "./sample.json";
import { complianceDisclosuresService } from "../service";

export async function seedComplianceDisclosures() {
  return complianceDisclosuresService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
