import sample from "./sample.json";
import { apiKeysService } from "../service";

export async function seedApiKeys() {
  return apiKeysService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
