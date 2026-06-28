import sample from "./sample.json";
import { sdkManagementService } from "../service";

export async function seedSdkManagement() {
  return sdkManagementService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
