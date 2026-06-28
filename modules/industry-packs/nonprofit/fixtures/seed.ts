import sample from "./sample.json";
import { nonprofitService } from "../service";

export async function seedNonprofit() {
  return nonprofitService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
