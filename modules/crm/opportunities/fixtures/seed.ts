import sample from "./sample.json";
import { opportunitiesService } from "../service";

export async function seedOpportunities() {
  return opportunitiesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
