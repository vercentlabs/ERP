import sample from "./sample.json";
import { taxMasterService } from "../service";

export async function seedTaxMaster() {
  return taxMasterService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
