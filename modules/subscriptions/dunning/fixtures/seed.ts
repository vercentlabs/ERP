import sample from "./sample.json";
import { dunningService } from "../service";

export async function seedDunning() {
  return dunningService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
