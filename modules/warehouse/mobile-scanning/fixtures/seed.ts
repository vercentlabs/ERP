import sample from "./sample.json";
import { mobileScanningService } from "../service";

export async function seedMobileScanning() {
  return mobileScanningService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
