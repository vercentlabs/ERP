import sample from "./sample.json";
import { itemsService } from "../service";

export async function seedItems() {
  return itemsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
