import sample from "./sample.json";
import { routingsService } from "../service";

export async function seedRoutings() {
  return routingsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
