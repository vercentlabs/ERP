import sample from "./sample.json";
import { salaryComponentsService } from "../service";

export async function seedSalaryComponents() {
  return salaryComponentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
