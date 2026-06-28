import sample from "./sample.json";
import { customerAssetsService } from "../service";

export async function seedCustomerAssets() {
  return customerAssetsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
