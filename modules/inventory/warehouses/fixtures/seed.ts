import sample from "./sample.json";
import { warehousesService } from "../service";

export async function seedWarehouses() {
  return warehousesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
