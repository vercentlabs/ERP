import sample from "./sample.json";
import { correctiveActionsService } from "../service";

export async function seedCorrectiveActions() {
  return correctiveActionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
