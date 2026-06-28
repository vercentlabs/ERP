import sample from "./sample.json";
import { localizationsIndiaProfessionalTaxService } from "../service";

export async function seedLocalizationsIndiaProfessionalTax() {
  return localizationsIndiaProfessionalTaxService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
