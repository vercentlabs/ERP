import sample from "./sample.json";
import { deductionsService } from "../service";

export async function seedDeductions() {
  return deductionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
