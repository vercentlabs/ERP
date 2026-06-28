import sample from "./sample.json";
import { equipmentService } from "../service";

export async function seedEquipment() {
  return equipmentService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
