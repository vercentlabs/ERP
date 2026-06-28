import sample from "./sample.json";
import { leadScoringService } from "../service";

export async function seedLeadScoring() {
  return leadScoringService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
