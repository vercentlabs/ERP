import sample from "./sample.json";
import { supplierScorecardsService } from "../service";

export async function seedSupplierScorecards() {
  return supplierScorecardsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
