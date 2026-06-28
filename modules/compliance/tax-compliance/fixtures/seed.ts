import sample from "./sample.json";
import { taxComplianceService } from "../service";

export async function seedTaxCompliance() {
  return taxComplianceService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
