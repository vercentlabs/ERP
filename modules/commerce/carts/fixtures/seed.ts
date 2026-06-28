import sample from "./sample.json";
import { cartsService } from "../service";

export async function seedCarts() {
  return cartsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
