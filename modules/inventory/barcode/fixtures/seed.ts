import sample from "./sample.json";
import { barcodeService } from "../service";

export async function seedBarcode() {
  return barcodeService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
