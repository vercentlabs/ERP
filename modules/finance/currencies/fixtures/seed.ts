import sample from "./sample.json";
import { currenciesService } from "../service";

export async function seedCurrencies() {
  return currenciesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
