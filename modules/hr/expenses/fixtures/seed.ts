import sample from "./sample.json";
import { expensesService } from "../service";

export async function seedExpenses() {
  return expensesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
