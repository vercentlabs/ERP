import sample from "./sample.json";
import { binsService } from "../service";

export async function seedBins() {
  return binsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
