import sample from "./sample.json";
import { paymentsService } from "../service";

export async function seedPayments() {
  return paymentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
