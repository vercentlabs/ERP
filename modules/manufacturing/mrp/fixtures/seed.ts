import sample from "./sample.json";
import { mrpService } from "../service";

export async function seedMrp() {
  return mrpService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
