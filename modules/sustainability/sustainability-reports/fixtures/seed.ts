import sample from "./sample.json";
import { sustainabilityReportsService } from "../service";

export async function seedSustainabilityReports() {
  return sustainabilityReportsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
