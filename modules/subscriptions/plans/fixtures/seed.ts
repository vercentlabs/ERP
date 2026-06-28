import sample from "./sample.json";
import { plansService } from "../service";

export async function seedPlans() {
  return plansService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
