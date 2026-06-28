import sample from "./sample.json";
import { documentIntelligenceService } from "../service";

export async function seedDocumentIntelligence() {
  return documentIntelligenceService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
