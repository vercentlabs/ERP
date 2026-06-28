import sample from "./sample.json";
import { returnsRepairsService } from "../service";

export async function seedReturnsRepairs() {
  return returnsRepairsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
