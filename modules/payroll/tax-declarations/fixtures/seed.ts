import sample from "./sample.json";
import { taxDeclarationsService } from "../service";

export async function seedTaxDeclarations() {
  return taxDeclarationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
