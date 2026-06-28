import sample from "./sample.json";
import { chartOfAccountsService } from "../service";

export async function seedChartOfAccounts() {
  return chartOfAccountsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
