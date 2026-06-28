import sample from "./sample.json";
import { dashboardsService } from "../service";

export async function seedDashboards() {
  return dashboardsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
