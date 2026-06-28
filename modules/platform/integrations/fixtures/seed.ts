import sample from "./sample.json";
import { integrationsService } from "../service";

export async function seedIntegrations() {
  return integrationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
