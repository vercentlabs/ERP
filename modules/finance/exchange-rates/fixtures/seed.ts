import sample from "./sample.json";
import { exchangeRatesService } from "../service";

export async function seedExchangeRates() {
  return exchangeRatesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
