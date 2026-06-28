import sample from "./sample.json";
import { planningService } from "../service";

export async function seedPlanning() {
  return planningService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
