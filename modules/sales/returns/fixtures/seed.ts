import sample from "./sample.json";
import { returnsService } from "../service";

export async function seedReturns() {
  return returnsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
