import sample from "./sample.json";
import { managementReportingService } from "../service";

export async function seedManagementReporting() {
  return managementReportingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
