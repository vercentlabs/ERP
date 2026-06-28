import sample from "./sample.json";
import { employmentContractsService } from "../service";

export async function seedEmploymentContracts() {
  return employmentContractsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
