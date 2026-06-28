import sample from "./sample.json";
import { accountsService } from "../service";

export async function seedAccounts() {
  return accountsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
