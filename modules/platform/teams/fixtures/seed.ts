import sample from "./sample.json";
import { teamsService } from "../service";

export async function seedTeams() {
  return teamsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
