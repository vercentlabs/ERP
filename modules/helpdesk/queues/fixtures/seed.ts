import sample from "./sample.json";
import { queuesService } from "../service";

export async function seedQueues() {
  return queuesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
