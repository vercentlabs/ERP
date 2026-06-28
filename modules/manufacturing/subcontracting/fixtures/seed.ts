import sample from "./sample.json";
import { subcontractingService } from "../service";

export async function seedSubcontracting() {
  return subcontractingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
