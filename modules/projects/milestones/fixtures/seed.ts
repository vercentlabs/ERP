import sample from "./sample.json";
import { milestonesService } from "../service";

export async function seedMilestones() {
  return milestonesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
