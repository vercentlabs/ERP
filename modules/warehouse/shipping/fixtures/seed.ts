import sample from "./sample.json";
import { shippingService } from "../service";

export async function seedShipping() {
  return shippingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
