import sample from "./sample.json";
import { supplierQuotationsService } from "../service";

export async function seedSupplierQuotations() {
  return supplierQuotationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
