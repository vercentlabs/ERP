import sample from "./sample.json";
import { healthcareService } from "../service";

export async function seedHealthcare() {
  return healthcareService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
