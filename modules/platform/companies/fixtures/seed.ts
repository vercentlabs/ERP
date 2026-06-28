import sample from "./sample.json";
import { companiesService } from "../service";

export async function seedCompanies() {
  return companiesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
