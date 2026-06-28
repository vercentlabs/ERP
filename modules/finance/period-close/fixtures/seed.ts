import sample from "./sample.json";
import { periodCloseService } from "../service";

export async function seedPeriodClose() {
  return periodCloseService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
