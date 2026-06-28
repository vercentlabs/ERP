import sample from "./sample.json";
import { currencyMasterService } from "../service";

export async function seedCurrencyMaster() {
  return currencyMasterService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
