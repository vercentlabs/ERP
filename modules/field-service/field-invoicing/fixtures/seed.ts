import sample from "./sample.json";
import { fieldInvoicingService } from "../service";

export async function seedFieldInvoicing() {
  return fieldInvoicingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
