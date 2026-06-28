import sample from "./sample.json";
import { benefitsService } from "../service";

export async function seedBenefits() {
  return benefitsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
