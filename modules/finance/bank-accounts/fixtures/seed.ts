import sample from "./sample.json";
import { bankAccountsService } from "../service";

export async function seedBankAccounts() {
  return bankAccountsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
