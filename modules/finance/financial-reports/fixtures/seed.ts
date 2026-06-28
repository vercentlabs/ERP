import sample from "./sample.json";
import { financialReportsService } from "../service";

export async function seedFinancialReports() {
  return financialReportsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
