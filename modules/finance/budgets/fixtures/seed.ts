import sample from "./sample.json";
import { budgetsService } from "../service";

export async function seedBudgets() {
  return budgetsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
