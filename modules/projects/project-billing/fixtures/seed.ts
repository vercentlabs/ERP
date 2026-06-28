import sample from "./sample.json";
import { projectBillingService } from "../service";

export async function seedProjectBilling() {
  return projectBillingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
