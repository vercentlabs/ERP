import sample from "./sample.json";
import { uomMasterService } from "../service";

export async function seedUomMaster() {
  return uomMasterService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
