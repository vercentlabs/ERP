import sample from "./sample.json";
import { taxesService } from "../service";

export async function seedTaxes() {
  return taxesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
