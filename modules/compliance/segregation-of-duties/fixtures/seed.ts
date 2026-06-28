import sample from "./sample.json";
import { segregationOfDutiesService } from "../service";

export async function seedSegregationOfDuties() {
  return segregationOfDutiesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
