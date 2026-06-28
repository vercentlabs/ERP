import sample from "./sample.json";
import { incidentsService } from "../service";

export async function seedIncidents() {
  return incidentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
