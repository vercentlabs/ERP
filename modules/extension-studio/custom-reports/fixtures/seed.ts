import sample from "./sample.json";
import { customReportsService } from "../service";

export async function seedCustomReports() {
  return customReportsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
