import sample from "./sample.json";
import { documentsService } from "../service";

export async function seedDocuments() {
  return documentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
