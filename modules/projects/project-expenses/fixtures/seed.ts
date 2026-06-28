import sample from "./sample.json";
import { projectExpensesService } from "../service";

export async function seedProjectExpenses() {
  return projectExpensesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
