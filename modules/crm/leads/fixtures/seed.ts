import sample from "./sample.json";
import { leadsService } from "../service";

export async function seedLeads() {
  return leadsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
