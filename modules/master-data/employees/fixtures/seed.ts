import sample from "./sample.json";
import { employeesService } from "../service";

export async function seedEmployees() {
  return employeesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
