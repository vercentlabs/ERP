import sample from "./sample.json";
import { apparelService } from "../service";

export async function seedApparel() {
  return apparelService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
