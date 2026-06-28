import sample from "./sample.json";
import { scheduledReportsService } from "../service";

export async function seedScheduledReports() {
  return scheduledReportsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
