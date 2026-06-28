import sample from "./sample.json";
import { discountsService } from "../service";

export async function seedDiscounts() {
  return discountsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
