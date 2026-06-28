import sample from "./sample.json";
import { itemCategoriesService } from "../service";

export async function seedItemCategories() {
  return itemCategoriesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
