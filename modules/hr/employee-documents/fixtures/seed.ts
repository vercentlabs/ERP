import sample from "./sample.json";
import { employeeDocumentsService } from "../service";

export async function seedEmployeeDocuments() {
  return employeeDocumentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
