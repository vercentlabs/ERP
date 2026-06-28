import sample from "./sample.json";
import { localizationsIndiaPfService } from "../service";

export async function seedLocalizationsIndiaPf() {
  return localizationsIndiaPfService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
