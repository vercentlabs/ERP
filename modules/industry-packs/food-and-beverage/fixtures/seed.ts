import sample from "./sample.json";
import { foodAndBeverageService } from "../service";

export async function seedFoodAndBeverage() {
  return foodAndBeverageService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
