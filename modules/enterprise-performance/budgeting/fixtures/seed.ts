import sample from "./sample.json";
import { budgetingService } from "../service";

export async function seedBudgeting() {
  return budgetingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
