import sample from "./sample.json";
import { timesheetsService } from "../service";

export async function seedTimesheets() {
  return timesheetsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
