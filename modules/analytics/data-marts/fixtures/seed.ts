import sample from "./sample.json";
import { dataMartsService } from "../service";

export async function seedDataMarts() {
  return dataMartsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
