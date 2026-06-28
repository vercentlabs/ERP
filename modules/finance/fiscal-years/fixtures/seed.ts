import sample from "./sample.json";
import { fiscalYearsService } from "../service";

export async function seedFiscalYears() {
  return fiscalYearsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
