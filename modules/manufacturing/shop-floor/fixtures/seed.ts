import sample from "./sample.json";
import { shopFloorService } from "../service";

export async function seedShopFloor() {
  return shopFloorService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
