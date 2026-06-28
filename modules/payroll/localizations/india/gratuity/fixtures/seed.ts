import sample from "./sample.json";
import { localizationsIndiaGratuityService } from "../service";

export async function seedLocalizationsIndiaGratuity() {
  return localizationsIndiaGratuityService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
