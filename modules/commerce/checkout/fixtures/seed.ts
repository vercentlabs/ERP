import sample from "./sample.json";
import { checkoutService } from "../service";

export async function seedCheckout() {
  return checkoutService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
