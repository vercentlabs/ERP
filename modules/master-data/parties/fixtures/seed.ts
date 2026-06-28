import sample from "./sample.json";
import { partiesService } from "../service";

export async function seedParties() {
  return partiesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
