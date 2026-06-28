import sample from "./sample.json";
import { couponsService } from "../service";

export async function seedCoupons() {
  return couponsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
