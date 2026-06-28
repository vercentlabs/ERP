import sample from "./sample.json";
import { supplierPortalService } from "../service";

export async function seedSupplierPortal() {
  return supplierPortalService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
