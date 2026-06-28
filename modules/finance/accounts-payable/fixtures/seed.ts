import sample from "./sample.json";
import { accountsPayableService } from "../service";

export async function seedAccountsPayable() {
  return accountsPayableService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
