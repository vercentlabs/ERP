import sample from "./sample.json";
import { procurementPoliciesService } from "../service";

export async function seedProcurementPolicies() {
  return procurementPoliciesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
