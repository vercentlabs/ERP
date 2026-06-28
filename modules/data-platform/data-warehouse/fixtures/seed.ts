import sample from "./sample.json";
import { dataWarehouseService } from "../service";

export async function seedDataWarehouse() {
  return dataWarehouseService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
