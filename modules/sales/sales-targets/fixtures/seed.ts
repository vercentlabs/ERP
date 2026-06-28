import sample from "./sample.json";
import { salesTargetsService } from "../service";

export async function seedSalesTargets() {
  return salesTargetsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
