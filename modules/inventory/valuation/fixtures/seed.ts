import sample from "./sample.json";
import { valuationService } from "../service";

export async function seedValuation() {
  return valuationService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
