import sample from "./sample.json";
import { payrollPeriodsService } from "../service";

export async function seedPayrollPeriods() {
  return payrollPeriodsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
