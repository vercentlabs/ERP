import sample from "./sample.json";
import { productsService } from "../service";

export async function seedProducts() {
  return productsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
