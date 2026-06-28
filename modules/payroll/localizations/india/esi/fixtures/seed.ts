import sample from "./sample.json";
import { localizationsIndiaEsiService } from "../service";

export async function seedLocalizationsIndiaEsi() {
  return localizationsIndiaEsiService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
