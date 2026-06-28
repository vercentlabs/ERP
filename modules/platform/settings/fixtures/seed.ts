import sample from "./sample.json";
import { settingsService } from "../service";

export async function seedSettings() {
  return settingsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
