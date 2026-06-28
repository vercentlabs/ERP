import sample from "./sample.json";
import { departmentsService } from "../service";

export async function seedDepartments() {
  return departmentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
