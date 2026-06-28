import sample from "./sample.json";
import { validationRulesService } from "../service";

export async function seedValidationRules() {
  return validationRulesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
