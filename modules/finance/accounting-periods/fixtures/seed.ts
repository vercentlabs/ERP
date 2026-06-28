import sample from "./sample.json";
import { accountingPeriodsService } from "../service";

export async function seedAccountingPeriods() {
  return accountingPeriodsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
