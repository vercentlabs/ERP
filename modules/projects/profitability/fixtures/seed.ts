import sample from "./sample.json";
import { profitabilityService } from "../service";

export async function seedProfitability() {
  return profitabilityService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
