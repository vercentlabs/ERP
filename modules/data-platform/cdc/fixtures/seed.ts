import sample from "./sample.json";
import { cdcService } from "../service";

export async function seedCdc() {
  return cdcService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
