import sample from "./sample.json";
import { deduplicationService } from "../service";

export async function seedDeduplication() {
  return deduplicationService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
