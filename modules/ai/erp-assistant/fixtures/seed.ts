import sample from "./sample.json";
import { erpAssistantService } from "../service";

export async function seedErpAssistant() {
  return erpAssistantService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
