import sample from "./sample.json";
import { fiscalCalendarsService } from "../service";

export async function seedFiscalCalendars() {
  return fiscalCalendarsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
