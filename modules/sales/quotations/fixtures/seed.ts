import sample from "./sample.json";
import { quotationsService } from "../service";

export async function seedQuotations() {
  return quotationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
