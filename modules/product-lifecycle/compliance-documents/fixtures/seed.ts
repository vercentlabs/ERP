import sample from "./sample.json";
import { complianceDocumentsService } from "../service";

export async function seedComplianceDocuments() {
  return complianceDocumentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
