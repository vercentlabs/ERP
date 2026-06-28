import sample from "./sample.json";
import { installedAppsService } from "../service";

export async function seedInstalledApps() {
  return installedAppsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
