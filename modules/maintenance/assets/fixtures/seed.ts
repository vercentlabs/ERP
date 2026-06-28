import sample from "./sample.json";
import { assetsService } from "../service";

export async function seedAssets() {
  return assetsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
