import sample from "./sample.json";
import { loansAdvancesService } from "../service";

export async function seedLoansAdvances() {
  return loansAdvancesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
