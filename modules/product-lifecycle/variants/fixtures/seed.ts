import sample from "./sample.json";
import { variantsService } from "../service";

export async function seedVariants() {
  return variantsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
