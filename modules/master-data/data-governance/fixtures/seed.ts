import sample from "./sample.json";
import { dataGovernanceService } from "../service";

export async function seedDataGovernance() {
  return dataGovernanceService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
