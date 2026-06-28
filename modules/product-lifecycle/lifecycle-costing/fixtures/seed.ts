import sample from "./sample.json";
import { lifecycleCostingService } from "../service";

export async function seedLifecycleCosting() {
  return lifecycleCostingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
