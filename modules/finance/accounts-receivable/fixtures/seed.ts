import sample from "./sample.json";
import { accountsReceivableService } from "../service";

export async function seedAccountsReceivable() {
  return accountsReceivableService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
