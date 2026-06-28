import sample from "./sample.json";
import { riskRegisterService } from "../service";

export async function seedRiskRegister() {
  return riskRegisterService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
