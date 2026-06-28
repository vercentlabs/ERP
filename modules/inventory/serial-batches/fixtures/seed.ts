import sample from "./sample.json";
import { serialBatchesService } from "../service";

export async function seedSerialBatches() {
  return serialBatchesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
