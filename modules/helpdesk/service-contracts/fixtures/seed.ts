import sample from "./sample.json";
import { serviceContractsService } from "../service";

export async function seedServiceContracts() {
  return serviceContractsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
