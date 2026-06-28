import sample from "./sample.json";
import { dataRetentionService } from "../service";

export async function seedDataRetention() {
  return dataRetentionService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
