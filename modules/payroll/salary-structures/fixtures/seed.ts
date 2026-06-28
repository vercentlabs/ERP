import sample from "./sample.json";
import { salaryStructuresService } from "../service";

export async function seedSalaryStructures() {
  return salaryStructuresService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
