import sample from "./sample.json";
import { statutoryReportsService } from "../service";

export async function seedStatutoryReports() {
  return statutoryReportsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
