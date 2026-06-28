import sample from "./sample.json";
import { operationalDataStoreService } from "../service";

export async function seedOperationalDataStore() {
  return operationalDataStoreService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
