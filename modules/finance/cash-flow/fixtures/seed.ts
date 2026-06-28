import sample from "./sample.json";
import { cashFlowService } from "../service";

export async function seedCashFlow() {
  return cashFlowService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
