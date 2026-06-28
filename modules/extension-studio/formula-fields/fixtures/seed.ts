import sample from "./sample.json";
import { formulaFieldsService } from "../service";

export async function seedFormulaFields() {
  return formulaFieldsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
