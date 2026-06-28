import sample from "./sample.json";
import { customLayoutsService } from "../service";

export async function seedCustomLayouts() {
  return customLayoutsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
