import sample from "./sample.json";
import { localizationService } from "../service";

export async function seedLocalization() {
  return localizationService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
