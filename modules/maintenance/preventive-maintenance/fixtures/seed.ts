import sample from "./sample.json";
import { preventiveMaintenanceService } from "../service";

export async function seedPreventiveMaintenance() {
  return preventiveMaintenanceService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
