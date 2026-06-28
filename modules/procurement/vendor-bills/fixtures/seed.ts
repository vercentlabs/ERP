import sample from "./sample.json";
import { vendorBillsService } from "../service";

export async function seedVendorBills() {
  return vendorBillsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
