import sample from "./sample.json";
import { invoicesService } from "../service";

export async function seedInvoices() {
  return invoicesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
