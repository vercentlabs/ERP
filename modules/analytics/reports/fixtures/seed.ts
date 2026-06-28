import sample from "./sample.json";
import { reportsService } from "../service";

export async function seedReports() {
  return reportsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
