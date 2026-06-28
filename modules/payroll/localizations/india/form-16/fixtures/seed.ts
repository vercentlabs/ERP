import sample from "./sample.json";
import { localizationsIndiaForm16Service } from "../service";

export async function seedLocalizationsIndiaForm16() {
  return localizationsIndiaForm16Service.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
