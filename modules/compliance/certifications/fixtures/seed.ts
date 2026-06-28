import sample from "./sample.json";
import { certificationsService } from "../service";

export async function seedCertifications() {
  return certificationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
