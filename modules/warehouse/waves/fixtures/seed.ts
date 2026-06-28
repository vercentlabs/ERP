import sample from "./sample.json";
import { wavesService } from "../service";

export async function seedWaves() {
  return wavesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
