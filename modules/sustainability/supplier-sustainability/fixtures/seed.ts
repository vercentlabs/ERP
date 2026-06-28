import sample from "./sample.json";
import { supplierSustainabilityService } from "../service";

export async function seedSupplierSustainability() {
  return supplierSustainabilityService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
