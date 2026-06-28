import sample from "./sample.json";
import { priceBooksService } from "../service";

export async function seedPriceBooks() {
  return priceBooksService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
