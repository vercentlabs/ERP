import sample from "./sample.json";
import { contractsService } from "../service";

export async function seedContracts() {
  return contractsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
