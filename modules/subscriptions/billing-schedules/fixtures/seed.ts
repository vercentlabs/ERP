import sample from "./sample.json";
import { billingSchedulesService } from "../service";

export async function seedBillingSchedules() {
  return billingSchedulesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
