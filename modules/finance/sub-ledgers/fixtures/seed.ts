import sample from "./sample.json";
import { subLedgersService } from "../service";

export async function seedSubLedgers() {
  return subLedgersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
