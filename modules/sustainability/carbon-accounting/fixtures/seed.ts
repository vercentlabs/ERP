import sample from "./sample.json";
import { carbonAccountingService } from "../service";

export async function seedCarbonAccounting() {
  return carbonAccountingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
