import sample from "./sample.json";
import { billOfMaterialsService } from "../service";

export async function seedBillOfMaterials() {
  return billOfMaterialsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
