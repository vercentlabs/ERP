import sample from "./sample.json";
import { supplierQualityService } from "../service";

export async function seedSupplierQuality() {
  return supplierQualityService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
