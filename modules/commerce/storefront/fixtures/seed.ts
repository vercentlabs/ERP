import sample from "./sample.json";
import { storefrontService } from "../service";

export async function seedStorefront() {
  return storefrontService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
