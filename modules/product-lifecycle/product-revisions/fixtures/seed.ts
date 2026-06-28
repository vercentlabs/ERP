import sample from "./sample.json";
import { productRevisionsService } from "../service";

export async function seedProductRevisions() {
  return productRevisionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
