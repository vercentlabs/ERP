import sample from "./sample.json";
import { customObjectsService } from "../service";

export async function seedCustomObjects() {
  return customObjectsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
