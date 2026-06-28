import sample from "./sample.json";
import { localizationsIndiaTdsService } from "../service";

export async function seedLocalizationsIndiaTds() {
  return localizationsIndiaTdsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
