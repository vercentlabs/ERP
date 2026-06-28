import sample from "./sample.json";
import { branchesService } from "../service";

export async function seedBranches() {
  return branchesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
