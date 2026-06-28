import sample from "./sample.json";
import { threeWayMatchService } from "../service";

export async function seedThreeWayMatch() {
  return threeWayMatchService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
