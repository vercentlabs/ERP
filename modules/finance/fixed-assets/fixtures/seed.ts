import sample from "./sample.json";
import { fixedAssetsService } from "../service";

export async function seedFixedAssets() {
  return fixedAssetsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
