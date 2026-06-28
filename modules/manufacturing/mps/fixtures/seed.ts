import sample from "./sample.json";
import { mpsService } from "../service";

export async function seedMps() {
  return mpsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
