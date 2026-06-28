import sample from "./sample.json";
import { putawayService } from "../service";

export async function seedPutaway() {
  return putawayService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
