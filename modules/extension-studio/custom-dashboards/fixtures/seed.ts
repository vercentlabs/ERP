import sample from "./sample.json";
import { customDashboardsService } from "../service";

export async function seedCustomDashboards() {
  return customDashboardsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
