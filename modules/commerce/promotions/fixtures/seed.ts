import sample from "./sample.json";
import { promotionsService } from "../service";

export async function seedPromotions() {
  return promotionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
