import sample from "./sample.json";
import { payrollRunsService } from "../service";

export async function seedPayrollRuns() {
  return payrollRunsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
