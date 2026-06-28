import sample from "./sample.json";
import { freightRatesService } from "../service";

export async function seedFreightRates() {
  return freightRatesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
