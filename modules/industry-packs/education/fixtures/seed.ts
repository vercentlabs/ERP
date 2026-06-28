import sample from "./sample.json";
import { educationService } from "../service";

export async function seedEducation() {
  return educationService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
