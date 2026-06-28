import sample from "./sample.json";
import { receiptsService } from "../service";

export async function seedReceipts() {
  return receiptsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
