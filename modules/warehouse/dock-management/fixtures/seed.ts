import sample from "./sample.json";
import { dockManagementService } from "../service";

export async function seedDockManagement() {
  return dockManagementService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
