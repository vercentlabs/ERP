import sample from "./sample.json";
import { softwareSaasService } from "../service";

export async function seedSoftwareSaas() {
  return softwareSaasService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
