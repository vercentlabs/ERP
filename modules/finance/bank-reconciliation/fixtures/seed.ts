import sample from "./sample.json";
import { bankReconciliationService } from "../service";

export async function seedBankReconciliation() {
  return bankReconciliationService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
