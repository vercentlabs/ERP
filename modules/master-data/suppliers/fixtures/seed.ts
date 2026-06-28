import sample from "./sample.json";
import { suppliersService } from "../service";

export async function seedSuppliers() {
  return suppliersService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
